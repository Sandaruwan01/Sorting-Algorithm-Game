
import { Algorithm } from './types';

export const ALGORITHMS: Algorithm[] = [
  {
    id: '1',
    slug: 'bubble-sort',
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    theory: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order. This process is repeated until the list is sorted. Although the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort. It can be practical if the input is in mostly sorted order with some out-of-order elements nearly in position.',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700'
  },
  {
    id: '2',
    slug: 'selection-sort',
    name: 'Selection Sort',
    description: 'An in-place comparison sorting algorithm. It has an O(n^2) time complexity, which makes it inefficient on large lists.',
    theory: 'The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array. The subarray which is already sorted, and the remaining subarray which is unsorted. In every iteration of selection sort, the minimum element from the unsorted subarray is picked and moved to the sorted subarray.',
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-700'
  },
  {
    id: '3',
    slug: 'insertion-sort',
    name: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms.',
    theory: 'Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part. To find the correct position, we iterate through the sorted part and compare the element to be inserted with each element, and then insert it at its correct position.',
    color: 'bg-purple-600',
    hoverColor: 'hover:bg-purple-700'
  },
  {
    id: '4',
    slug: 'merge-sort',
    name: 'Merge Sort',
    description: 'An efficient, stable, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output.',
    theory: 'Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is a key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.',
    color: 'bg-yellow-600',
    hoverColor: 'hover:bg-yellow-700'
  },
  {
    id: '5',
    slug: 'quick-sort',
    name: 'Quick Sort',
    description: 'An efficient sorting algorithm. Developed by British computer scientist Tony Hoare in 1959 and published in 1961, it is still a commonly used algorithm for sorting.',
    theory: 'QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. The key process in quickSort is partition(). The target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x.',
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700'
  },
];
