define(["insertion_sort"], (insertion_sort)=>{
    return {
        new_insertion_sort : (elements) => { return new insertion_sort(elements); }
    }
})