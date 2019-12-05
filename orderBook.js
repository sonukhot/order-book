
function reconcileOrder(existingBook, incomingOrder) {
  if (existingBook.length === 0) {
    existingBook.push(incomingOrder)
  } else {
    var matchingIndex = -1
    var quantityNotFulfilled = incomingOrder.quantity
    var matchingIndexList = []
    for (var i = 0; i < existingBook.length; i++) {
      var existingOrder = existingBook[i]
      if (incomingOrder.type != existingOrder.type
        && incomingOrder.price === existingOrder.price) {
        matchingIndex = i
        matchingIndexList.push(i)
        if (quantityNotFulfilled > existingOrder.quantity) {
          quantityNotFulfilled = quantityNotFulfilled - existingOrder.quantity
        } else {
          quantityNotFulfilled = 0
          break
        }
      }
    }
    var remainingQuantity = incomingOrder.quantity
    if (matchingIndex != -1) {
      for (var j = 0; j < matchingIndexList.length; j++) {
        if (remainingQuantity >= existingBook[matchingIndexList[j] - j].quantity) {
          remainingQuantity = remainingQuantity - existingBook[matchingIndexList[j] - j].quantity
          existingBook.splice(matchingIndexList[j] - j, 1)
        } else {
          existingBook[matchingIndexList[j] - j].quantity = existingBook[matchingIndexList[j] - j].quantity - remainingQuantity
          remainingQuantity = 0
          break
        }
      }
      if (remainingQuantity > 0) {
        incomingOrder.quantity = remainingQuantity
        existingBook.push(incomingOrder)
      }
    } else {
      existingBook.push(incomingOrder)
    }

  }
  return existingBook
}



module.exports = reconcileOrder

