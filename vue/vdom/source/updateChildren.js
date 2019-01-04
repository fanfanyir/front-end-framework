function updateChildren(vnode, newVnode){
    var children = vnode.children || {}
    var newChildren = newVnode.children ||  []

    children.forEach(function(child, index){
        var newChild = newChildren[index]
        if(newChild == null){
            return
        }
        if(child.tag == newChild.tag){
            updateChildren(child, newChild)
        }else{
            //替换
            replaceNode(child, newChild)
        }
    });
}
function replaceNode(vnode, newVnode){
    var elem = vnode.elem
    var newElem = creatElement(newVnode)
    
}