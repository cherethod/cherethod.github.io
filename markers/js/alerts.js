import Swal from './sweetalert2/src/sweetalert2.js'

const deleteEntryWarning = (elementType, elementName) => {
    return new Promise((resolve) => {
        Swal.fire({
        title: 'Confirm Deletion',
        text: `This action will remove the ${elementType}: ${elementName}. Are you sure?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
        }).then((result) => {
        resolve(result.isConfirmed);
        });
    });
};

const customWarning = (errorText, confirmText = 'Yes, add it!', cancelText = 'No, cancel!') => {
    return new Promise((resolve) => {
        Swal.fire({
        title: 'Warning',
        text: errorText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        }).then((result) => {
        resolve(result.isConfirmed);
        });
    });
};

const understoodWarning = (warningText) => {
    return new Promise((resolve) => {
        Swal.fire({
        title: 'Warning',
        text: warningText,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Understood'
        }).then((result) => {
        resolve(result.isConfirmed)
        });
    });
};

export { deleteEntryWarning, customWarning, understoodWarning }