/**
 * 非比较排序算法
 * 计数排序
 * 基数排序(忒麻烦,懒得写了)
 * 桶排序
 */
var insertionSort = require('./sort').insertionSort;
/*
 * 计数
 * */
function count(arr, smallest, largest) {

    var counts = [];

    for (var i = smallest; i <= largest; i++) {

        counts[i] = 0;
    }

    for (var j = 0; j < arr.length; j++) {

        counts[arr[j]]++;
    }

    for (var k = 1; k < counts.length; k++) {

        counts[k] += counts[k - 1];
    }

    return counts;
}

/*
 * 计数排序
 * */
function countingSort(arr, smallest, largest) {

    var counts = count(arr, smallest, largest),
        ret = [];

    for (var i = 0; i < arr.length; i++) {

        var ele = arr[i];
        ret[counts[ele] - 1] = ele;
        counts[ele]--;
    }

    return ret;
}

/*
 * 基数排序
 * */
function radixSort(arr, radixSize) {

    for (var i = 0; i < radixSize; i++) {

        //sort arr by current radix, using counting sort
    }
}

/*
 * 桶排序
 * */
function bucketSort(arr) {

    var buckets = [];

    function bucketIndex(number) {

        return Math.floor(number * 10);
    }

    for (var i = 0; i < arr.length; i++) {

        var num = arr[i],
            bIndex = bucketIndex(arr[i]),
            bucket = buckets[bIndex];

        if (!bucket) {

            buckets[bIndex] = [num];
        }
        else {

            bucket.push(num);
        }
    }

    var ret = [];

    for (i = 0; i < buckets.length; i++) {

        bucket = buckets[i];
        insertionSort(bucket);
        ret = ret.concat(bucket);
    }

    return ret;
}