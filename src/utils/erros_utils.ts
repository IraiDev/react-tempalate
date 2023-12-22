export const controlledFieldError = (control: any, controlName: any) => {
  if (control && !controlName) {
    throw new Error('Si se proporciona "control", "controlName" también debe proporcionarse.')
  }
}
