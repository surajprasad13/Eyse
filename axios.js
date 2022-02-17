import axios from 'axios';
class Api {
  static _axios = null;
  static instance() {
    if (this._axios == null) {
      this._axios = axios.create({
        baseURL: 'http://18.190.154.188:9000/',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWJlZTJjMzg3Nzg1ZjA5NzljY2ZiY2EiLCJlbWFpbCI6InRhbWFuQDEyMy5nbWFpbC5jb20iLCJtb2JpbGUiOiI3MDA3MzMyNzI3IiwiaWF0IjoxNjQwNDMyMzgyLCJleHAiOjE2NDMwMjQzODJ9.nryRqU1BpWss5RGwSCuSts_wnyrdsHsACSHZXP6maWw',
        },
      });
    }
    return this._axios;
  }
}
export class Auth {
  static login(userName, password) {
    return Api.instance().post('inflncr/login', {
      userName: userName,
      password: password,
    });
  }
}
export class UserApi {
  static getUserDetails(id) {
    return Api.instance().get('inflncr/getInfluencerDetails/' + id);
  }
  static getUserImagePost(id) {
    return Api.instance().get('inflncr/getInfluencerImagePosts/' + id);
  }
  static getUserVideoPost(id) {
    return Api.instance().get('inflncr/getInfluencerVideoPosts/' + id);
  }
  static becomeInfluencer(formdata) {
    return Api.instance().post('inflncr/registerNewInfluencer', formdata);
  }
}
export class UserPost {
  static uploadFile(formData) {
    return Api.instance().post('file/s3-upload', formData);
  }
  static getHashtags() {
    return Api.instance().get(
      'inflncr/getInfluencerPostHashtags/61ac85f65fd1c001b33c4078',
    );
  }
}
