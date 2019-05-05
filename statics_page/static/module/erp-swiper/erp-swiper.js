$.extend({
  preview: function ({
    option,
    data
  }) {
    //data必须是数组
    if (!data || !data.length) {
      alert('数据不存在或格式有误！')
      return
    }
    //默认图片内容
    var type = type ? type : 'img';
    var slides_html = ``;
    $.each(data, function (index, item) {
      //默认图片内容
      item.type = item.type ? item.type : 'img';
      slides_html += `
      <div class="swiper-slide">
          ${item.title?`<div class="slide_header">${item.title}</div>`:''}
          <div class="slide_con">
              ${item.type=='img'?`
              <img src="${item.url}" class="slide-image"/>
              `:item.type=='pdf'?`
              <embed src="${item.url}" type="application/pdf" class="slide-pdf">
              `:`<div class="swiper-slide">${item.url}</div>`}
          </div>
      </div>
      `
    })
    var swiper_html = `
    <div class="swiper-container">
        <div class="swiper-wrapper">
            ${slides_html}
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        
        <!-- 如果需要滚动条 -->
        ${option&&option.scrollbar?'<div class="swiper-scrollbar"></div>':''}
    </div>
    `;
    window.dialog({
      title: '预览',
      content: swiper_html,
    }).showModal();
    var defule_option = {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
      effect: 'fade', // 切换效果

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      /* scrollbar: {
        el: '.swiper-scrollbar',
      } */
    }
    var mySwiper = new Swiper('.swiper-container', $.extend(defule_option, option));
    console.log($.extend(defule_option, option));
  }
})


$("#view_image").on("click", function (e) {
  //可在option中直接传入swiper相关配置，配置中的对象属性请完整填写（不支持增量配置）
  //data为数组类型
  $.preview({
    data: [{
        title: '销售合作协议-1',
        type: 'img',
        url: 'https://files.test.ybm100.com/G1/M00/00/0F/Cgoz1Fu8Ui-AdxPEAAC8s1oVJpc475.png'
      },
      {
        title: '销售合作协议-2',
        type: 'img',
        url: 'https://files.test.ybm100.com/G1/M00/00/10/Cgoz01u8UiuAek4RAABWIPm1IR0714.png'
      },
      {
        title: '销售合作协议-3',
        type: 'img',
        url: 'https://files.test.ybm100.com/G1/M00/00/0F/Cgoz1Fu8UiiAQpN-AABejNEFU14824.png'
      }
    ],
  })
})

$("#view_pdf").on("click", function (e) {
  $.preview({
    data: [{
        title: '销售合作协议-1',
        type: 'pdf',
        url: 'https://files.test.ybm100.com/G2/M00/00/08/Cgo001uI3AGAT-q8AAEPWOSosRc543.pdf'
      },
      {
        title: '销售合作协议-2',
        type: 'pdf',
        url: 'https://files.test.ybm100.com/G1/M00/00/07/Cgoz1FuBCJ2AU4EKAADeWImURgM456.pdf'
      },
      {
        title: '销售合作协议-3',
        type: 'pdf',
        url: 'https://files.test.ybm100.com/G2/M00/00/08/Cgo001uI3AGAT-q8AAEPWOSosRc543.pdf'
      }
    ]
  })
})

$("#view_other").on("click", function (e) {
  $.preview({
    data: [{
        title: '销售合作协议-1',
        type: 'img',
        url: 'https://files.test.ybm100.com/G1/M00/00/0F/Cgoz1Fu8Ui-AdxPEAAC8s1oVJpc475.png'
      },
      {
        title: '销售合作协议-2',
        type: 'pdf',
        url: 'https://files.test.ybm100.com/G1/M00/00/07/Cgoz1FuBCJ2AU4EKAADeWImURgM456.pdf'
      },
      {
        title: '销售合作协议-3',
        type: 'pdf',
        url: 'https://files.test.ybm100.com/G2/M00/00/08/Cgo001uI3AGAT-q8AAEPWOSosRc543.pdf'
      }
    ]
  })
})