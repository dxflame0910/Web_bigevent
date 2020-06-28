$(function () {
    getUserInfo()
    $('#btnLogin').on('click', function () {

        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })

})


function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
    })
}


function renderAvatar(user) {
    const name = user.nickname || user.username
    $('#welcome').html('欢迎' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        // $('.text-avatar').html(name[0])
        const first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}







