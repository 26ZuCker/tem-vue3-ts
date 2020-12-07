function a(arr: any[]) {
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    for (var j = i - 1; j >= 0; j--) {
      var tmp = arr[j];
      var order = tmp - element;
      if (order > 0) {
        arr[j + 1] = tmp;
      } else {
        break;
      }
    }
    arr[j + 1] = element;
  }
  return arr;
}

const insertSort = (arr: number[]) => {};

export default insertSort;
