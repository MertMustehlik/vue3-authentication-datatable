<template>
    <button :class="'px-4 py-2 rounded-lg flex justify-center items-center gap-1 ' + computedClasses + ' ' + loadingClasses" :disabled="loading">
        <span v-if="loading"><i class="fa fa-spinner animate-spin"></i> Please wait...</span>
        <span v-else>
            <slot v-if="$slots.icon" name="icon"/>
            <slot/>
        </span>
    </button>
</template>
<script>
export default {
    name: "CustomButton",
    data() {
        return {
            btnClasses: "",
            loadingClasses: ""
        }
    },
    props: {
        btnType: {
            type: String,
            default: "primary"
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computedClasses() {
            switch (this.btnType) {
                case "primary":
                    return "bg-blue-600 hover:bg-blue-700 text-white";
                case "danger":
                    return "bg-red-600 hover:bg-red-700 text-white";
                case "light":
                    return "bg-white hover:bg-gray-100 text-gray-900 border border-2";
                default:
                    return "";
            }
        }
    },
    watch: {
        loading(value){
            this.loadingClasses = value ? "opacity-75 cursor-not-allowed" : ""
        }
    }
}
</script>