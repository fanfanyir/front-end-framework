function creatElement(vnode){
    var tag = vnode.tag
    var attrs = vnode.attrs || {}
    var children = vnode.children || []
    if(!tag){
        return null
    }

    // 创建元素
    var ele = document.createElement(tag)
    // 属性
    var attrName
    for(attrName in attrs){
        if(attrs.hasOwnProperty(attrName)){
            ele.setAttribute(attrName, attrs[attrName])
        }
    }

    children.forEach(childVnode => {
        ele.appendchild(creatElement(childVnode))//递归，添加真实的dom元素
    });

    return ele
}