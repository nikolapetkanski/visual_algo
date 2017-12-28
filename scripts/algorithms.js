define(["insertion_sort"], (insertion_sort)=>{
    return {
        new_insertion_sort : (elements, w, h, p) => { return new insertion_sort(elements, w, h, p); }
    }
})