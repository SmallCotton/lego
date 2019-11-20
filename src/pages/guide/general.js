import React from 'react';
import { Wrap } from '../../components';
// import { Link } from 'react-router-dom';

export const GeneralDesc = () => (
  <Wrap>
    <div className='guide-help'>
      <div className='guide-node'>
        <h2 className='help-title help-title-main'>
          <span>通用说明</span>
        </h2>
        <div className='help-content'>
          <p>对系统通用功能和模块做统一说明，帮助开发者更好的理解和使用LEGO。</p>
        </div>
      </div>
      <div className='guide-node' id='json-schema'>
        <h2 className='help-title help-title-sub'>
          <a className='hash' href='#json-schema'>
            <i className='fas fa-link'></i>
          </a>
          <span>JSON-Schema</span>
        </h2>
        <div className='help-content'>
          <p>
            要了解<code>JSON Schema</code>是什么，我们首先要了解<code>JSON</code>是什么。JSON（JavaScript Object
            Notation）是一种简单的互联网数据交换格式。JSON基于JavaScript而来，它已被证明足够有用且足够简单，现在也被用于许多其他不涉及互联网数据交换的环境中。
            <b>JSON-Schema是描述JSON数据结构的声明格式</b>
            ，它本身也是用JSON编写的，可以为JSON数据提供清晰、严谨的声明，并可用于数据验证，保证数据交换的正确性。关于JSON-Schema更多内容，请查阅官网
            <a href='https://json-schema.org/' target='_blank' rel='noopener noreferrer'>
              https://json-schema.org/
            </a>
          </p>
        </div>
      </div>
      <div className='guide-node' id='url-variable'>
        <h2 className='help-title help-title-sub'>
          <a className='hash' href='#url-variable'>
            <i className='fas fa-link'></i>
          </a>
          <span>URL变量</span>
        </h2>
        <div className='help-content'>
          <p>
            URL变量是一种定制URL参数的方式，用在表单提交、表单回填、列表数据等模块。开发者根据需要提供带变量的URL，实现对API的定制，系统中大部分API都支持URL变量。
          </p>
          <p>
            格式如：<code>{'https://example.com/api/{{model}}/?id={{orderid}}&state={{state}}'}</code>，变量
            <code>{'{{key}}'}</code>会被替换为当前页面URL中同名参数的值，若找不到对应参数则替换为空。例如当前页URL为
            https://lego.com/htm/form/use/1?orderid=123&model=order，则API被替换为
            {'https://example.com/api/order/?id=123&state='}
          </p>
        </div>
      </div>
      <div className='guide-node' id='show-popup'>
        <h2 className='help-title help-title-sub'>
          <a className='hash' href='#file-upload'>
            <i className='fas fa-link'></i>
          </a>
          <span>自定义弹窗</span>
        </h2>
        <div className='help-content'>
          <p>为方便部分操作在当前页进行，LEGO支持自定义弹窗，支持iframe和html渲染，用法如下：</p>
          <pre>{`popupShow(
  src: "xxx", // url或html，可嵌入表单或其他页面
  width: 700, // 弹窗宽度，默认700
  height: 400 // 弹窗高度，默认400，最大不得超过800
);

popupShow() // 关闭弹窗`}</pre>
        </div>
      </div>
      <div className='guide-node' id='file-upload'>
        <h2 className='help-title help-title-sub'>
          <a className='hash' href='#file-upload'>
            <i className='fas fa-link'></i>
          </a>
          <span>文件上传</span>
        </h2>
        <div className='help-content'>
          <p>
            系统默认使用「系统设置-上传方法」上传文件或图片，开发者根据后端提供的上传接口实现
            <code>window.fileUploader</code>。<br />
            如果某表单需要自定义上传方法，在表单扩展中声明
            <code>window.formUploader</code>，用法相同。参数及用法Demo：
          </p>
          <pre>
            {`/**
 * 实现 window.fileUploader
 * 
 * file 文件对象
 * path 上传表单在schema中的路径，如 "root.info.image"，富文本编辑器的path为常量 "wysiwyg"
 * cbs 按需执行回调，将上传结果回传
 * 
 * cbs.progress: 更新进度, int, 值为0-100（success时自动设为100）
 * cbs.fail: 失败回调, string, 值为失败说明
 * cbs.success: 成功回调, string, 值为文件URI
 */
window.fileUploader = function (file, path, cbs) {
  console.log(path);
  setTimeout(() => {
    cbs.progress(30);
  }, 500);

  setTimeout(() => {
    cbs.success('//www.sogo.com/web/index/images/logo_440x140.v.4.png');
  }, 2e3);
};`}
          </pre>
        </div>
      </div>
      <div className='guide-node' id='icon-font'>
        <h2 className='help-title help-title-sub'>
          <a className='hash' href='#icon-font'>
            <i className='fas fa-link'></i>
          </a>
          <span>IconFont</span>
        </h2>
        <div className='help-content'>
          <p>
            系统内置1500+
            <a href='https://fontawesome.com/icons?d=gallery&m=free' target='_blank' rel='noopener noreferrer'>
              Font Awesome
            </a>
            字体图标，可在「系统设置-左侧菜单」、「列表配置-数据操作」直接填写图标名称进行配置。
          </p>
        </div>
      </div>
    </div>
  </Wrap>
);