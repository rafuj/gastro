import toast from "react-hot-toast";

const successToast = (message) => {
  toast.success(message, {
    id: 1,
  });
};

const errorToast = (message) => {
  toast.error(message, { id: 1 });
};

const loadingToast = (message) => {
  toast.loading(message, { id: 1 });
};

export { successToast, errorToast, loadingToast };
