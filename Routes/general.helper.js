/**
 * Created by Saleh on 07/02/2019.
 */
'use strict'

var PromiseReturns = require('bluebird')
var _ = require('lodash')

// Check if user has permission or not
function checkIfUserHasPermission (permissionName, permissionsArray) {
  for (let i = 0; i < permissionsArray.length; i++) {
    if (permissionName === permissionsArray[i].moduleName) {
      return true
    }
  }
  return false
}

function rejectPromise (message, code = null) {
  return new PromiseReturns(function (resolve, reject) {
    reject(new StandardError({
      status: 'Error',
      message: message,
      statusCode: code
    }))
  })
}

function catchException (err) {
  winston.error(err)
  return rejectPromise(err.message, err.statusCode)
}

function putS3Object (s3, params) {
  return new PromiseReturns(function (resolve, reject) {
    s3.putObject(params, function (err) {
      if (err) {
        return rejectPromiseReturns(reject, err)
      }
      resolve()
    })
  })
}

function uploadImageToS3 (imageFile) {
  return new PromiseReturns(function (resolve) {
    if (imageFile) {
      var file = imageFile
      var fileName = file.originalname
      var filePath = config.s3.host_name + config.s3.bucket + '/' + config.s3.paths.original + fileName
      var s3Key = config.s3.paths.original + fileName

      AWS.config.update(config.s3.credentials)
      var s3 = new AWS.S3({ params: { Bucket: config.s3.bucket } })
      var params = {
        Key: s3Key,
        Body: fs.createReadStream(file.path),
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'application/octet-stream'
      }
      var obj = {
        s3: s3,
        params: params,
        filePath: filePath
      }
      return resolve(obj)
    } else {
      resolve(null)
    }
  })
}

module.exports = {
  checkIfUserHasPermission,
  rejectPromise,
  catchException,
  putS3Object,
  uploadImageToS3
}
