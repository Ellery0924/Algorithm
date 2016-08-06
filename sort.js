function swap(arr, i, j) {

    var tmp = arr[j];

    arr[j] = arr[i];
    arr[i] = tmp;
}

/*
 * 冒泡排序
 * */
function bubblesort(arr) {

    var len = arr.length;

    for (var i = len - 2; i > 0; i--) {

        for (var j = 0; j < i; j++) {

            if (arr[j] > arr[j + 1]) {

                swap(arr, j, j + 1);
            }
        }
    }
}

/*
 * 插入排序
 * */
function insertionsort(arr) {

    for (var i = 1; i < arr.length; i++) {

        var j = i,
            tmp = arr[i];

        while (tmp < arr[j - 1]) {

            arr[j] = arr[j - 1];
            j--;
        }

        arr[j] = tmp;
    }
}

/*
 * 选择排序
 * */
function minIndex(arr, s) {

    var min = s;

    for (var i = s; i < arr.length; i++) {

        if (arr[i] < arr[min]) {

            min = i;
        }
    }

    return min;
}

function selectionsort(arr) {

    for (var i = 0; i < arr.length - 1; i++) {

        swap(arr, i, minIndex(arr, i + 1));
    }
}

/*
 * 非原址快排
 * */
function quicksort(arr) {

    if (arr.length === 0) {

        return [];
    }

    var r = arr[0],
        left = [],
        right = [];

    for (var i = 1; i < arr.length; i++) {

        var el = arr[i];

        if (el <= r) {

            left.push(el);
        }
        else {

            right.push(el);
        }
    }

    return quicksort(left).concat(r).concat(quicksort(right));
}

/*
 * 原址快排
 * */
function quicksort2(arr, start, end) {

    if (start >= end) {

        return;
    }

    var q = partition(arr, start, end);
    quicksort2(arr, start, q - 1);
    quicksort2(arr, q + 1, end);
}

/*
 * 原址快排分割操作
 * */
function partition(arr, start, end) {

    var r = arr[end], j, i;

    i = j = start;

    for (; i < end; i++) {

        if (arr[i] < r) {

            swap(arr, i, j);
            j++;
        }
    }

    swap(arr, end, j);
    return j;
}

/*
 * 获取左孩子节点
 * */
function leftChild(heap, i) {

    return 2 * i + 1 < heap.heapSize ? 2 * i + 1 : null;
}

/*
 * 获取右孩子节点
 * */
function rightChild(heap, i) {

    return 2 * i + 2 < heap.heapSize ? 2 * i + 2 : null;
}

/*
 * 是否为叶节点
 * */
function isLeaf(heap, i) {

    return i > Math.floor(heap.heapSize / 2) - 1;
}

/*
 * 取最大值
 * */
function max(arr) {

    var max = arr[0];

    for (var i = 1; i < arr.length; i++) {

        if (max < arr[i]) {

            max = arr[i];
        }
    }

    return max;
}

/*
 * 维护堆性质
 * */
function maxHeapify(heap, i) {

    if (isLeaf(heap, i)) {

        return;
    }

    var left = leftChild(heap, i),
        right = rightChild(heap, i),
        current = i;

    var biggest = max([heap[left], heap[right], heap[current]]);

    if (left && biggest === heap[left]) {

        swap(heap, current, left);
        maxHeapify(heap, left);
    }
    else if (right && biggest === heap[right]) {

        swap(heap, current, right);
        maxHeapify(heap, right);
    }
}

/*
 * 建堆,时间复杂度为O(n)
 * */
function buildHeap(arr) {

    var mid = Math.floor(arr.length / 2) - 1;

    for (var i = mid; i >= 0; i--) {

        maxHeapify(arr, i);
    }
}

/*
 * 堆排序
 * */
function heapSort(arr) {

    arr.heapSize = arr.length;
    buildHeap(arr);

    for (var i = arr.length - 1; i > 0; i--) {

        swap(arr, 0, --arr.heapSize);
        maxHeapify(arr, 0);
    }
}

/*
 * 归并排序
 * */
function mergesort(arr, start, end) {

    start = start === undefined ? 0 : start;
    end = end === undefined ? arr.length - 1 : end;

    if (start < end) {

        var mid = Math.floor((start + end) / 2);
        mergesort(arr, start, mid);
        mergesort(arr, mid + 1, end);
        merge(arr, start, mid, mid + 1, end);
    }
}

/*
 * 归并两个排好序的子数组
 * */
function merge(arr, s1, e1, s2, e2) {

    var left = [],
        right = [];

    var infinite = 100000000;

    for (var i = s1; i <= e1; i++) {

        left.push(arr[i]);
    }

    for (var j = s2; j <= e2; j++) {

        right.push(arr[j]);
    }

    left.push(infinite);
    right.push(infinite);

    var lNow = 0, rNow = 0, now = s1;

    while (now <= e2) {

        var lEle = left[lNow],
            rEle = right[rNow];

        if (lEle < rEle) {

            arr[now++] = lEle;
            lNow++;
        }
        else {

            arr[now++] = rEle;
            rNow++;
        }
    }
}

//var test = [1, 3, 5, 6, 2, 6, 199, 200];

//console.log(merge(test, 0, 3, 4, 7));
//console.log(mergesort(test, 0, 7));

function generateRandomList() {

    return new Array(100)
        .fill(1)
        .map(function () {
            return parseInt(Math.random() * 100, 10);
        });
}

var test = generateRandomList();
console.log(test);
mergesort(test);
console.log(test);
// console.log(test);
