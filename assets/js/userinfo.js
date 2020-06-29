$(function () {
    const form = layui.form;
    const layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称不能超过6位'
            }
        }
    })

    function getuserinfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            success: function (res) {
                if (res.status !== 0) {
                    return '获取用户信息失败'
                }
                // console.log(res.data)
                // renderinit()
                form.val('userinfo', res.data)
            },
        })
    }

    getuserinfo()


    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault()
        getuserinfo()
    })



    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改用户信息失败")
                }
                layer.msg('修改用户信息成功')
                window.parent.getUserInfo()
            }
        })
    })
})



