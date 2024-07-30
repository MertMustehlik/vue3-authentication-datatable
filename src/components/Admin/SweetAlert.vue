<template>
    <transition name="fade">
        <div v-if="open" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <!-- start::Body -->
                        <div class="bg-white">
                            <!-- start::Icon -->
                            <div class="text-center mt-12">
                                <i v-if="type === 'success'" class="fa fa-circle-check text-7xl text-green-500"></i>
                                <i v-else-if="type === 'error'"
                                   class="fa fa-circle-exclamation text-7xl text-red-600"></i>
                            </div>
                            <!-- end::Icon -->
                            <!-- start::Content -->
                            <div class="text-center mt-10">
                                <h3 v-if="$slots.message" class="text-xl font-semibold text-gray-900">
                                    <slot name="message"/>
                                </h3>
                            </div>
                            <!-- end::Content -->
                        </div>
                        <!-- start::Body -->
                        <!-- start::Footer -->
                        <div class="mb-7 flex justify-center items-center mt-8">
                            <CustomButton v-if="!hideCancelBtn" @click="$emit('close')" btn-type="light">Cancel</CustomButton>
                        </div>
                        <!-- end::Footer -->
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import CustomButton from "@/components/Admin/CustomButton.vue";

export default {
    name: "SweetAlert",
    components: {CustomButton},
    emits: ["close"],
    props: {
        open: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "success"
        },
        hideCancelBtn: {
            type: Boolean,
            default: false
        }
    }
}
</script>
