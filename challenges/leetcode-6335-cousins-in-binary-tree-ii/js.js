
// Note to readers: if you try to you global variables to store state, LeetCode will run multiple tests in
// parallel in the same context

// Meaning if you put `valsByDepthBySibling` global, it would contain garbage at the end
// (learned that the hard way)

// ---

// console.log = () => {}
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var replaceValueInTree = function (root) {
  let valsByDepthBySibling = {}
  let sumsByDepthBySibling = {}
  let depth = 0
  let maxDepth = { v: 0 } // store it in an object so root node can state is shared and root node can read it at the end
  return replaceValueInTree2(root, depth, valsByDepthBySibling, sumsByDepthBySibling, maxDepth)
}

var replaceValueInTree2 = function (root, depth, valsByDepthBySibling, sumsByDepthBySibling, maxDepth) {
  if (!root) return
  console.log('DURING1', valsByDepthBySibling)
  console.log('DURING2', sumsByDepthBySibling)

  if (!valsByDepthBySibling[depth + 1]) valsByDepthBySibling[depth + 1] = []
  valsByDepthBySibling[depth + 1].push([root?.left?.val || 0, root?.right?.val || 0])

  maxDepth.v = Math.max(maxDepth.v, depth)
  replaceValueInTree2(root.left, depth + 1, valsByDepthBySibling, sumsByDepthBySibling, maxDepth)
  replaceValueInTree2(root.right, depth + 1, valsByDepthBySibling, sumsByDepthBySibling, maxDepth)

  if (depth === 0) {
    console.log(root)
    console.log('valsByDepthBySibling BEFORE', valsByDepthBySibling)
    console.log('sumsByDepthBySibling BEFORE', sumsByDepthBySibling)
    console.log(maxDepth)

    for (let i = 0; i <= maxDepth.v; i++) {
      if (!valsByDepthBySibling[i]) valsByDepthBySibling[i] = []
      sumsByDepthBySibling[i] = valsByDepthBySibling[i].reduce((acc, cur) => acc + cur.reduce((acc2, cur2) => acc2 + cur2, 0), 0)
    }
    console.log('sumsByDepthBySibling AFTER', sumsByDepthBySibling)

    let res = getNewTree(root, 0, sumsByDepthBySibling)
    root.val = 0
    console.log(res)
    console.log('----------------')
    return res
  }
  return root
}

function getNewTree(root, depth = 0, sumsByDepthBySibling) {
  if (!root) return
  console.log('WTF', sumsByDepthBySibling)

  let sumChildren = (root?.left?.val || 0) + (root?.right?.val || 0)
  if (root.left) root.left.val = sumsByDepthBySibling[depth + 1] - sumChildren
  if (root.right) root.right.val = sumsByDepthBySibling[depth + 1] - sumChildren
  getNewTree(root.left, depth + 1, sumsByDepthBySibling)
  getNewTree(root.right, depth + 1, sumsByDepthBySibling)

  return root
}
