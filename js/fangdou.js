window.onload = function () {
    let timer = null
    window.onscroll = function () { //判断定时器是否还在运行
        if(timer) { //清除上一次事件创建的定时器
            clearTimeout(timer)
        } //创建一个延迟为500ms的定时器并赋值给timer
        timer = setTimeout(function () { //定时器延迟过后获取导航栏离文档顶部的距离
            console.log(window.scrollY)
            function scrollDirection (currentTop) {
                const result = currentTop > initTop // true is down & false is up
                initTop = currentTop
                // console.log(window.scrollY)
                return result
              }
          
            let initTop = 0
            
            // let isChatShow = true
            const $header = document.getElementById('page-header')
            // const isChatBtnHide = typeof chatBtnHide === 'function'
            // const isChatBtnShow = typeof chatBtnShow === 'function'
        
            window.scrollCollect = () => {
            return btf.throttle(function (e) {
                const currentTop = window.scrollY || document.documentElement.scrollTop
                const isDown = scrollDirection(currentTop)
                if (currentTop > 140) {
                if (isDown) {
                    if ($header.classList.contains('nav-visible')) $header.classList.remove('nav-visible')
                } else {
                    if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible')
                }
                $header.classList.add('nav-fixed')
                }
            }, 200)()
            }
        
            window.addEventListener('scroll', scrollCollect)
        }, 500)
    }
}
