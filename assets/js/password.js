$(function () {
    const form = layui.form;
    const layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        newpwd: function (value) {
            if (value === $('[name=password]').val()) {
                return '新老密码一致请更改'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newpassword]').val()) {
                return '确认新密码失败'
            }
        }
    })



    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: { oldPwd: $('[name=password]').val(), newPwd: $('[name=newpassword]').val(), },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg(res.message)
            }
        })
    })


})