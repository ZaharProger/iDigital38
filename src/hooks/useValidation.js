export default function useValidation() {
    return function (inputs, validationFunc) {
        const errorFields = []

        inputs.forEach(input => {
            const validationResult = validationFunc(input.value)
            if (!validationResult) {
                errorFields.push(input)
            }
        })

        return errorFields
    }
}