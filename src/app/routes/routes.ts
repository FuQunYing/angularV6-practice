export const ROUTER_LIST = {
  'components': [
    {
      'name': 'device',
      'zh': '设备管理',
      'icon': 'anticon-hdd',
      'children': [
        {
          'label': 'query',
          'path': 'device/query',
          'zh': '设备查询'
        },
        {
          'label': 'bind',
          'path': 'device/bind',
          'zh': '设备绑定'
        },
        {
          'label': 'activate',
          'path': 'device/activate',
          'zh': '生产激活'
        },
        {
          'label': 'speed',
          'path': 'device/speed',
          'zh': '上分速度'
        }
      ]
    },
    {
      'name': 'order',
      'zh': '订单/投诉',
      'icon': 'anticon-book',
      'children': [
        {
          'label': 'query',
          'path': 'order/query',
          'zh': '订单查询'
        },
        {
          'label': 'complain',
          'path': 'order/complain',
          'zh': '投诉查询'
        }
      ]
    },
    {
      'name': 'cardno',
      'zh': '消费者管理',
      'icon': 'anticon-team',
      'children': [
        {
          'label': 'query',
          'path': 'cardno/query',
          'zh': '卡号查询'
        },
        {
          'label': 'recharge',
          'path': 'cardno/recharge',
          'zh': '虚拟充值'
        }
      ]
    },
    {
      'name': 'maintain',
      'zh': '运维管理',
      'icon': 'anticon-setting',
      'children': [
        {
          'label': 'notice',
          'path': 'maintain/notice',
          'zh': '运维公告'
        },
        {
          'label': 'checkgoods',
          'path': 'maintain/checkgoods',
          'zh': '第三方商品审核'
        },
        {
          'label': 'logs',
          'path': 'maintain/logs',
          'zh': '支付页面升级日志'
        },
        {
          'label': 'public',
          'path': 'maintain/public',
          'zh': '互帮云库'
        }
      ]
    },
    /*{
      'name': 'power',
      'zh': '权限管理',
      'icon': 'anticon-user',
      'children': [
        {
          'label': 'manage',
          'path': 'power/manage',
          'zh': '功能分配'
        }
      ]
    }*/
  ]
};
