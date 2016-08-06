/**
 * 非比较排序算法
 * 计数排序
 * 基数排序
 * 桶排序
 */

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
function countingsort(arr, smallest, largest) {

    var counts = count(arr, smallest, largest),
        ret = [];

    for (var i = 0; i < arr.length; i++) {

        var ele = arr[i];
        ret[counts[ele] - 1] = ele;
        counts[ele]--;
    }

    return ret;
}

function generateTestList(range) {

    return new Array(10).fill(1).map(function () {
        return Math.floor(Math.random() * range);
    })
}

var range = 9;
var test = generateTestList(range);
console.log(test);
console.log(countingsort(test, 0, range));