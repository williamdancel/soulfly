<script setup lang="ts">
import { reactive } from 'vue'
import { router } from '@inertiajs/vue3'
import SweetAlert from '@/services/sweetAlert'
import '../../css/components/landing-page.css'
import { ref, onMounted, onUnmounted } from 'vue'


const form = reactive({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    processing: false,
})

const submitForm = async () => {
    form.processing = true
    
    try {
        await router.post('/contacts', form, {
            preserveScroll: true,
            onSuccess: () => {
                SweetAlert.success(
                    'Thank You!',
                    'Your message has been sent successfully. We will get back to you within 24 hours.'
                )
                
                // Reset form
                form.name = ''
                form.email = ''
                form.phone = ''
                form.company = ''
                form.message = ''
                form.processing = false
            },
            onError: (errors) => {
                let errorMessage = 'Please check the form for errors.'
                
                if (errors && Object.keys(errors).length > 0) {
                    errorMessage = Object.values(errors).join('<br>')
                }
                
                SweetAlert.error('Submission Failed', errorMessage)
                form.processing = false
            }
        })
    } catch (error) {
        let errorMessage = 'Please check the form for errors.'
         if (error && Object.keys(error).length > 0) {
            errorMessage = Object.values(error).join('<br>')
        }
        SweetAlert.error('Error', 'An unexpected error occurred. Please try again.', errorMessage)
        form.processing = false
    }
}
    // Back to Top Button Logic
    const showBackToTop = ref(false)

    const handleScroll = () => {
        showBackToTop.value = window.scrollY > 300
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    // Smooth Scroll to Section
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }
</script>
<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <!-- Hero Section -->
        <section class="relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div class="relative container mx-auto px-4 py-20 md:py-32">
                <div> 
                    <img src="/logo/soulfly-logo.png" alt="Soulfly Logo" class="soulfly-logo mx-auto " />
                </div>
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                        <span class="block text-gray-900">Transform</span>
                        <span class="block text-blue-600">Your Business</span>
                        <span class="block text-gray-900">with Technology</span>
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                        Soulfly IT Solutions transforms the way your business competes. 
                        We provide end-to-end IT solutions as we meet the demands of today's growing business.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <button 
                            @click="scrollToSection('services')"
                            class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                        >
                            Explore Services
                        </button>
                        <button 
                            @click="scrollToSection('contact')"
                            class="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition duration-300"
                        >
                            Get In Touch
                        </button>
                    </div>
                    
                    <!-- Scroll Indicator -->
                    <div class="mt-20 animate-bounce">
                        <button  @click="scrollToSection('services')" class="text-gray-400 hover:text-blue-600 transition">
                            <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our IT Solutions
                    </h2>
                    <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                        Comprehensive technology services to drive your business growth
                    </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <!-- ERP Service -->
                    <div class="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
                        <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Custom ERP Solutions</h3>
                        <p class="text-gray-600 mb-4">
                            Streamline your business operations with tailored Enterprise Resource Planning systems that integrate all your processes.
                        </p>
                        <ul class="text-gray-600 space-y-2">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                Inventory & Order Management
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                Financial & Accounting Modules
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                Real-time Analytics Dashboard
                            </li>
                        </ul>
                    </div>

                    <!-- CRM Service -->
                    <div class="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
                        <div class="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.67 1.664l-.955.955a.5.5 0 01-.353.146H19.5a.5.5 0 01-.5-.5v-1.793a.5.5 0 01.146-.353l.955-.955a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">CRM Systems</h3>
                        <p class="text-gray-600 mb-4">
                            Build stronger customer relationships with our Customer Relationship Management solutions designed for growth.
                        </p>
                        <ul class="text-gray-600 space-y-2">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                Lead & Pipeline Management
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                Marketing Automation
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                Customer Support Integration
                            </li>
                        </ul>
                    </div>

                    <!-- Infrastructure Service -->
                    <div class="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
                        <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">IT Infrastructure</h3>
                        <p class="text-gray-600 mb-4">
                            Robust and scalable infrastructure solutions to support your business's technological foundation.
                        </p>
                        <ul class="text-gray-600 space-y-2">
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                Cloud Migration & Management
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                Network Security & Setup
                            </li>
                            <li class="flex items-center">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                                24/7 Monitoring & Support
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                    <div class="text-center mb-12">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Get In Touch
                        </h2>
                        <p class="text-gray-600 text-lg">
                            Ready to transform your business? Contact us for a free consultation.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div class="md:flex">
                            <div class="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white">
                                <h3 class="text-2xl font-bold mb-6">Let's Start Your Digital Transformation</h3>
                                <p class="mb-8 opacity-90">
                                    Fill out this form and our experts will reach out to discuss how we can help your business grow with technology.
                                </p>
                                
                                <div class="space-y-4">
                                    <div class="flex items-center">
                                        <svg class="w-6 h-6 mr-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                        <!-- Email as clickable link -->
                                        <a href="mailto:info@soulflysolutions.com" class="hover:text-white transition-colors duration-200">
                                            info@soulflysolutions.com
                                        </a>
                                    </div>
                                    <div class="flex items-center">
                                        <svg class="w-6 h-6 mr-3 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                        </svg>
                                        <!-- Phone as clickable link -->
                                        <a href="tel:+639457934490" class="hover:text-white transition-colors duration-200">
                                            +63 945 793 4490
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="md:w-1/2 p-8 md:p-12">
                                <form @submit.prevent="submitForm" class="space-y-6">
                                    <div>
                                        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                                            Name <span style="color: red;">*</span>
                                        </label>
                                        <input 
                                            v-model="form.name"
                                            type="text" 
                                            id="name" 
                                            maxlength="50"
                                            required
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="Your full name">
                                    </div>

                                    <div>
                                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                                            Email <span style="color: red;">*</span>
                                        </label>
                                        <input 
                                            v-model="form.email"
                                            type="email" 
                                            id="email"
                                            maxlength="50"
                                            required
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="your.email@example.com">
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                                                Phone (Optional)
                                            </label>
                                            <div class="flex">
                                                <div class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                                    +63
                                                </div>
                                                <input 
                                                    v-model="form.phone"
                                                    type="tel" 
                                                    id="phone" 
                                                    maxlength="10"
                                                    class="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition -ml-px placeholder:text-sm placeholder:text-gray-400"
                                                    placeholder="912 345 6789" style="width: 120px;">
                                            </div>
                                        </div>

                                        <div>
                                            <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                                                Company (Optional)
                                            </label>
                                            <input 
                                                v-model="form.company"
                                                type="text" 
                                                id="company" 
                                                maxlength="50"
                                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                placeholder="Company Name">
                                        </div>
                                    </div>

                                    <div>
                                        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                                            Message <span style="color: red;">*</span>
                                        </label>
                                        <textarea 
                                            v-model="form.message"
                                            id="message" 
                                            rows="4"
                                            required
                                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            placeholder="Tell us about your project or requirements..."></textarea>
                                    </div>

                                    <button 
                                        type="submit"
                                        :disabled="form.processing"
                                        class="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50">
                                        <span v-if="form.processing">Sending...</span>
                                        <span v-else>Send Message</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
         <!-- Footer -->
        <footer class="py-6">
            <div class="container mx-auto px-4">
                <div class="text-center">
                    <p class="text-black-400">&copy; 2026 Soulfly Solutions Inc. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
        <!-- Back to Top Button -->
        <button
            v-show="showBackToTop"
            @click="scrollToTop"
            class="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-110 z-50"
            aria-label="Back to top"
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        </button>
    </div>
</template>