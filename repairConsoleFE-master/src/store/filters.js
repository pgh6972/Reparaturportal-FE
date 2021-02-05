export function filterManufacturer(userDevices, currUserDevice) {
  if (!currUserDevice) return userDevices;

  console.log(userDevices);
  return userDevices.filter(device => {
    return device.manufacturer.toLowerCase().match(currUserDevice.toLowerCase());
  });
}
