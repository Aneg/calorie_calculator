const findObjectById = (objects, id) => {
  return objects.find((el) => { return el.id === id })
}

const findIndexObjectById = (objects, id) => {
  return objects.findIndex((el) => { return el.id === id })
}

const dropOrUpdateObjectById = (objects, id, newObject = null) => {
  let key = findIndexObjectById(objects, id)
  if (key !== -1) {
    return newObject ? objects.splice(key, 1, newObject) : objects.splice(key, 1)
  }
  return []
}

const copyValue = (value) => {
  return JSON.parse(JSON.stringify(value))
}

const generateIdByObject = (new_objects, next_id) => {
  new_objects.map((el) => {
    if (!el.id) {
      el.id = next_id;
      next_id += 1;
    }
    return el
  })
  return next_id;
}

export { findObjectById, findIndexObjectById, dropOrUpdateObjectById, copyValue, generateIdByObject }
