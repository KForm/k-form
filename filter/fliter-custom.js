const customFilterGroup = [
  {
    filterName: 'toUpperCase',
    filterFn: (val) => {
      if (val.toUpperCase) {
        return val.toUpperCase()
      } else {
        return val
      }
    }
  }
]
export default customFilterGroup
