function quickSort(arr: number[]) {
  // 交换元素
  function swap(arr: number[], a: number, b: number) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  function partition(arr: number[], left: number, right: number) {
    var pivot = arr[left];
    var storeIndex = left;

    for (var i = left + 1; i <= right; i++) {
      if (arr[i] < pivot) {
        swap(arr, ++storeIndex, i);
      }
    }

    swap(arr, left, storeIndex);

    return storeIndex;
  }

  function sort(arr: number[], left: number, right: number) {
    if (left < right) {
      var storeIndex = partition(arr, left, right);
      sort(arr, left, storeIndex - 1);
      sort(arr, storeIndex + 1, right);
    }
  }

  sort(arr, 0, arr.length - 1);

  return arr;
}

export default quickSort;
