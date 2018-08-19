import axios from 'axios';

export default {

    putCreative(creativeId, formData){
        return axios({
            method: 'put',
            url: '/api/creative/' + creativeId,
            headers: { 'content-type': 'multipart/form-data' },
            data: formData
        });
    }

}