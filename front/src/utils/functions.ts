export const getFormData: (form:HTMLFormElement) => {[k : string] : FormDataEntryValue} = (form) => {

    const formData: FormData = new FormData(form)
    return Object.fromEntries(formData);

}