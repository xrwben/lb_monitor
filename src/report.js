const requestByImage = (url, data) => {
  const img = new Image()
  img.src = `${url}?data=${data}`
}

const requestBySendBeacon = (url, data) => {
  navigator.sendBeacon(url, JSON.stringify(data))
}

// 上报方法
const report = (url, data) => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      requestBySendBeacon(url, data)
    }, {
      timeout: 3000
    })
  } else {
    setTimeout(() => {
      requestBySendBeacon(url, data)
    }, 3000)
  }
}

export default report 