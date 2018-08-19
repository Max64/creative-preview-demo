<template>
    <el-col :span="span">
        <div class="creative-device device-active">
            <span class="device-icon" :class="{'fa-rotate-90': device.mode.landscape}">
                <font-awesome-icon :icon="getIcon(device)" />
            </span>

            <div class="device-size" :class="{'uploaded-size': isUploadedSize(size), 'selected-size': isSelectedSize(size)}"
                 v-for="(dim, size) in device.sizes" @click="sizeClick(size)">
                    <i v-if="isUploadedSize(size)" class="el-icon-success"></i>
                    {{ dim.w + 'x' + dim.h }}
            </div>
        </div>
    </el-col>
</template>

<script>

    export default {
        name: 'device',
        props: ['device', 'span', 'uploadedUrls', 'selectedSize'],
        methods: {
            getIcon(device) {
                return device.mode.mobile ? 'mobile-alt' : 'tablet-alt';
            },

            isUploadedSize(size) {
                let forDevice = this.uploadedUrls[this.device.mode.id];
                if (!forDevice) return;

                return forDevice[size];
            },

            isSelectedSize(size) {
                return this.selectedSize.mode === this.device.mode.id && this.selectedSize.size === size;
            },

            sizeClick(size) {
                if (!this.isUploadedSize(size)) {
                    return;
                }

                this.$emit('select-size', { mode: this.device.mode.id, size: size });
            }
        }
    }
</script>

<style lang="scss">

    $active-color: #ff3333;

    .creative-device {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #303030;
    }

    .creative-device .device-size:not(:last-child) {
        margin-bottom: 10px;
    }

    .device-size {
        padding: 10px;
    }

    .uploaded-size {
        color: $active-color;
    }

    .uploaded-size:hover {
        cursor: pointer;
    }

    .selected-size {
        border: 2px solid $active-color;
    }

    .device-icon {
        padding: 10px;
        font-size: 1.5em;
    }

    .fa-rotate-90 {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

</style>