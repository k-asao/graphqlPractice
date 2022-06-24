declare module '*.vue' {
  module 'vue/types/vue' {
    interface Vue {
      $notifier: {
        showSuccessMessage: (params: { content?: string }) => void
        showErrorMessage: (params: { content?: string }) => void
      }
    }
  }
}
