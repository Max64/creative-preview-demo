<template>
    <div class="creative-loader">
        <el-row class="loader-row">
            <el-col :span="24">
                <el-upload
                    class="creative-upload"
                    drag
                    action=""
                    :http-request="upload"
                    :before-upload="beforeUpload"
                    :show-file-list="false"
                    multiple>
                    <div class="wrap">
                        <div class="info">
                            <div class="info-icon">
                                <font-awesome-icon icon="users" />
                            </div>

                            <div class="info-text">
                                <div>Drag files here or select them from storage</div>
                                <div>Allowed JPG and PNG images with size under 3MB</div>
                            </div>
                        </div>
                    </div>
                </el-upload>
            </el-col>
        </el-row>

        <el-row class="loader-row">
            <el-col class="creative-preview" :span="type == 'interstitial' ? 12 : 16">
                <div v-if="!imageUrl" class="preview-icon">
                    <font-awesome-icon icon="images" />
                </div>

                <div v-if="!imageUrl">
                    Click banner sizes for detailed preview
                </div>

                <img v-if="imageUrl" :src="imageUrl">
            </el-col>

            <el-col class="" :span="type == 'interstitial' ? 12 : 8">
                <el-row>
                    <device v-for='device in devices' :device='device' :span='24/devices.length'
                            :uploaded-urls="uploadedUrls" :selected-size="selectedSize" @select-size="handleSizeSelect"></device>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CreativeApi from '../service/CreativeApi'
    import Device from './Device.vue'
    import {CREATIVE_TYPES} from './devicesConfig'

    const SUPPORTED_TYPES = ['image/jpeg', 'image/png'];
    const MAX_FILE_SIZE = 3*1024*1024;

    const creativeId = 123;

    const creativeSet = [{
        dimensions: '',
        assetUrl: ''
    }];

    export default {
        name: 'creative-loader',
        components: {
            Device
        },
        props: {
            type: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                creativeId: 123,
                selectedSize: {
                    mode: '',
                    size: ''
                },
                imageUrl: '',
                uploadedUrls: {},
                devices: CREATIVE_TYPES[this.type]
            }
        },
        created() {
            this.creativeId = creativeId;
        },
        methods: {
            handleSizeSelect(selectedSize) {
                this.selectedSize = selectedSize;
                this.imageUrl = this.uploadedUrls[selectedSize.mode][selectedSize.size];
            },

            beforeUpload(file) {
                const isSupportedType = SUPPORTED_TYPES.includes(file.type);
                const isSupportedSize = file.size < MAX_FILE_SIZE;

                if (!isSupportedType) {
                    this.$message.error('File must be JPEG or PNG format');
                }
                if (!isSupportedSize) {
                    this.$message.error('File size can not exceed 3MB');
                }

                return isSupportedType && isSupportedSize;
            },

            upload(file) {
                let imgFile = file.file;

                let url = URL.createObjectURL(imgFile);
                let img = new Image;
                let comp = this;

                img.src = url;

                img.onload = function() {
                    let formData = new FormData();
                    formData.append('file', imgFile, file.name);
                    formData.append('width', img.width.toString());
                    formData.append('height', img.height.toString());

                    CreativeApi.putCreative(comp.creativeId, formData)
                        .then(function (response) {
                            comp.imageUrl = url;
                            comp.uploadSuccess(url, img.width, img.height);
                        })
                        .catch(function (error) {
                            comp.$message.error('Возникла ошибка пр загрузке креатива, код ошибки: ' + error.response.status);
                        });
                };
            },

            uploadSuccess(url, width, height) {
                let deviceSize = this.findDeviceSize(width, height);

                if (!deviceSize) {
                    this.$message.error('Unknown image dimensions');
                    return;
                }

                if (!this.uploadedUrls[deviceSize.mode])
                    Vue.set(this.uploadedUrls, deviceSize.mode, {});

                Vue.set(this.uploadedUrls[deviceSize.mode], deviceSize.size, url);

                this.selectedSize = deviceSize;
            },

            findDeviceSize(width, height) {
                for (let i=0; i<this.devices.length; i++) {
                    let device = this.devices[i];

                    for (let size in device.sizes) {
                        let dim = device.sizes[size];

                        if (dim.w === width && dim.h === height) {
                            return {
                                mode: device.mode.id,
                                size: size
                            };
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss">

    .creative-loader {

        max-width: 1200px;
        padding: 10px;
        color: #A0A0A0;
        background-color: #E8E8E8;

        .loader-row {
            padding: 10px;
        }

        .el-upload, .el-upload-dragger {
            width: 100%;
            height: 70px;
            background-color: transparent;
        }

        .wrap, .info-icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .wrap {
            height: 100%;
        }

        .info {
            display: flex;
            justify-content: center;
        }

        .info div {
            text-align: left;
        }

        .info-icon {
            font-size: 1.5em;
            padding-right: 10px;
        }

        .creative-preview {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            min-height: 300px;
            max-width: 600px;
            background-color: #ffffff;
        }

        .creative-preview img {
            max-width: 100%;
        }

        .preview-icon {
            font-size: 3em;
        }

    }

</style>