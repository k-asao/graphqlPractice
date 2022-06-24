export default () => {
  if (process.env.VCONSOLE_ENABLED !== '1') {
    return
  }

  window.vConsole = new window.VConsole({
    defaultPlugins: ['system', 'network', 'element', 'storage'],
    maxLogNumber: 1000,
    onReady() {
      console.log('vConsole is ready.')
    },
    onClearLog() {
      console.log('on clearLog')
    }
  })
}
