import Swal from 'sweetalert2';

export default class SweetAlert {
    /**
     * Show success alert
     */
    static success(title, text = '', options = {}) {
        return Swal.fire({
            title,
            text,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3b82f6',
            ...options
        });
    }

    /**
     * Show error alert
     */
    static error(title, text = '', options = {}) {
        return Swal.fire({
            title,
            text,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ef4444',
            ...options
        });
    }

    /**
     * Show warning alert
     */
    static warning(title, text = '', options = {}) {
        return Swal.fire({
            title,
            text,
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#f59e0b',
            ...options
        });
    }

    /**
     * Show info alert
     */
    static info(title, text = '', options = {}) {
        return Swal.fire({
            title,
            text,
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#06b6d4',
            ...options
        });
    }

    /**
     * Show confirmation dialog
     */
    static confirm(title, text = '', options = {}) {
        return Swal.fire({
            title,
            text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#6b7280',
            reverseButtons: true,
            ...options
        });
    }

    /**
     * Show toast notification
     */
    static toast(title, icon = 'success', options = {}) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
            ...options
        });

        return Toast.fire({
            icon,
            title
        });
    }

    /**
     * Show contact details in modal
     */
    static contactDetails(contact) {
        const html = `
            <div class="text-left space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <p class="mt-1 text-lg font-semibold text-gray-900">${contact.name}</p>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <p class="mt-1">
                        <a href="mailto:${contact.email}" class="text-blue-600 hover:text-blue-800">
                            ${contact.email}
                        </a>
                    </p>
                </div>
                
                ${contact.phone ? `
                <div>
                    <label class="block text-sm font-medium text-gray-700">Phone</label>
                    <p class="mt-1">${contact.phone}</p>
                </div>
                ` : ''}
                
                ${contact.company ? `
                <div>
                    <label class="block text-sm font-medium text-gray-700">Company</label>
                    <p class="mt-1">${contact.company}</p>
                </div>
                ` : ''}
                
                <div>
                    <label class="block text-sm font-medium text-gray-700">Message</label>
                    <div class="mt-2 p-3 bg-gray-50 rounded-lg">
                        <p class="text-gray-700 whitespace-pre-line">${contact.message}</p>
                    </div>
                </div>
                
                <div class="pt-2 text-sm text-gray-500">
                    Submitted: ${new Date(contact.created_at).toLocaleString()}
                </div>
            </div>
        `;

        return Swal.fire({
            title: 'Contact Details',
            html,
            icon: 'info',
            confirmButtonText: 'Close',
            confirmButtonColor: '#3b82f6',
            width: '600px'
        });
    }
}