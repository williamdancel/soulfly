<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import SweetAlert from '@/services/sweetAlert'

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    message: string;
    created_at: string;
}

interface Props {
    contacts?: {
        data: Contact[];
        links: any[];
        meta: any;
    };
    filters?: {
        search: string;
    };
    stats?: {
        total: number;
        today: number;
        this_week: number;
        with_company: number;
    };
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const searchQuery = ref(props.filters?.search || '');

const handleSearch = () => {
    router.get('/dashboard', 
        { search: searchQuery.value }, 
        { preserveState: true, replace: true }
    );
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};



const deleteContact = async (contactId: number) => {
    const result = await SweetAlert.confirm(
                    'Delete Contacts', 'Are you sure you want to delete this contact? This action cannot be undone.'
                );

    if (result.isConfirmed) {
        try {
            await router.delete(`/contacts/${contactId}`, {
                preserveScroll: true,
            });
            
            // Show success message
            SweetAlert.warning(
                    'Delete Contacts', 'Contact has been deleted.'
                );
        } catch (error) {
            let errorMessage = 'Please check the form for errors.';
            if (error && Object.keys(error).length > 0) {
                errorMessage = Object.values(error).join('<br>')
            }
            SweetAlert.error('Error', 'An unexpected error occurred. Please try again.', errorMessage)
        }
    }
};

const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
};

// If no data is passed, show placeholders
const hasData = computed(() => props.contacts && props.contacts.data.length > 0);
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Stats Cards -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <!-- Total Contacts -->
                <div
                    class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                >
                    <div class="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div class="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                            <svg class="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.67 1.664l-.955.955a.5.5 0 01-.353.146H19.5a.5.5 0 01-.5-.5v-1.793a.5.5 0 01.146-.353l.955-.955a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414z" />
                            </svg>
                        </div>
                        <p class="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-white">
                            {{ stats?.total || 0 }}
                        </p>
                    </div>
                </div>
                
                <!-- Today's Contacts -->
                <div
                    class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                >
                    <div class="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div class="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                            <svg class="h-8 w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p class="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">Today</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-white">
                            {{ stats?.today || 0 }}
                        </p>
                    </div>
                </div>
                
                <!-- This Week -->
                <div
                    class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                >
                    <div class="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div class="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                            <svg class="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <p class="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                        <p class="text-3xl font-bold text-gray-900 dark:text-white">
                            {{ stats?.this_week || 0 }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Main Content Area -->
            <div
                class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border"
            >
                <!-- Search Bar -->
                <div class="border-b border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            v-model="searchQuery"
                            @keyup.enter="handleSearch"
                            type="text"
                            placeholder="Search contacts..."
                            class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-blue-500"
                        />
                        <button 
                            @click="handleSearch"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                        >
                            Search
                        </button>
                    </div>
                </div>

                <!-- Contacts Table -->
                <div class="overflow-auto">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead class="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Contact
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Message
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Submitted
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-900">
                            <tr v-if="!hasData">
                                <td colspan="4" class="px-6 py-12 text-center">
                                    <div class="flex flex-col items-center justify-center gap-3">
                                        <svg class="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.67 1.664l-.955.955a.5.5 0 01-.353.146H19.5a.5.5 0 01-.5-.5v-1.793a.5.5 0 01.146-.353l.955-.955a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414z" />
                                        </svg>
                                        <p class="text-lg font-medium text-gray-500 dark:text-gray-400">No contacts yet</p>
                                        <p class="text-sm text-gray-400">Contacts from your landing page will appear here</p>
                                    </div>
                                </td>
                            </tr>
                            
                            <tr v-for="contact in contacts?.data" :key="contact.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <!-- Contact Column -->
                                <td class="whitespace-nowrap px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="h-10 w-10 flex-shrink-0">
                                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                                <span class="font-medium text-blue-600 dark:text-blue-300">
                                                    {{ getInitial(contact.name) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <div class="font-medium text-gray-900 dark:text-white">
                                                {{ contact.name }}
                                            </div>
                                            <div class="mt-1 space-y-1">
                                                <div class="flex items-center gap-2">
                                                    <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <a :href="`mailto:${contact.email}`" class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400">
                                                        {{ contact.email }}
                                                    </a>
                                                </div>
                                                <div v-if="contact.phone" class="flex items-center gap-2">
                                                    <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span class="text-xs text-gray-600 dark:text-gray-400">
                                                        {{ '+63 ' + contact.phone }}
                                                    </span>
                                                </div>
                                                <div v-if="contact.company" class="flex items-center gap-2">
                                                    <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span class="text-xs text-gray-600 dark:text-gray-400">
                                                        {{ contact.company }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <!-- Message Column -->
                                <td class="px-6 py-4">
                                    <div class="max-w-xs">
                                        <p class="text-sm text-gray-600 dark:text-gray-400">
                                            {{ contact.message }}
                                        </p>
                                    
                                    </div>
                                </td>

                                <!-- Date Column -->
                                <td class="whitespace-nowrap px-6 py-4">
                                    <div class="text-sm text-gray-900 dark:text-white">
                                        {{ formatDate(contact.created_at) }}
                                    </div>
                                </td>

                                <!-- Actions Column -->
                                <td class="whitespace-nowrap px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <button
                                            @click="deleteContact(contact.id)"
                                            class="rounded p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                                            title="Delete contact"
                                        >
                                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                        
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="contacts?.links && contacts.links.length > 3" class="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-700 dark:text-gray-400">
                            Showing {{ contacts.meta.from }} to {{ contacts.meta.to }} of {{ contacts.meta.total }}
                        </div>
                        <div class="flex gap-1">
                            <a
                                v-for="link in contacts.links"
                                :key="link.label"
                                :href="link.url || '#'"
                                @click.prevent="link.url && router.visit(link.url)"
                                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                :class="{
                                    'z-10 border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400': link.active,
                                    'text-gray-500 hover:text-gray-700 dark:text-gray-400': !link.active,
                                    'pointer-events-none text-gray-300 dark:text-gray-600': !link.url,
                                }"
                                v-html="link.label"
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>