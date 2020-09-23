const coreFilterGroup = [
  {
    filterName: 'unixTolocal',
    filterFn: (time) => {
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
    }
  }
]
export default coreFilterGroup
