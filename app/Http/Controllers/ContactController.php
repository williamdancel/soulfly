<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of contacts.
     */
    public function index(Request $request)
    {
        // Get search query
        $search = $request->query('search', '');
        
        // Build query with search
        $contacts = Contact::when($search, function ($query, $search) {
            return $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        })
        ->orderBy('created_at', 'desc')
        ->paginate(15)
        ->withQueryString(); // Preserve search query in pagination links

        // Calculate stats based on your existing data
        $total = Contact::count();
        $today = Contact::whereDate('created_at', today())->count();
        $thisWeek = Contact::whereBetween('created_at', [
            now()->startOfWeek(),
            now()->endOfWeek()
        ])->count();
        
        return Inertia::render('Dashboard', [
            'contacts' => $contacts,
            'filters' => [
                'search' => $search,
            ],
            'stats' => [
                'total' => $total,
                'today' => $today,
                'this_week' => $thisWeek,
                'with_company' => Contact::whereNotNull('company')->count(),
            ]
        ]);
    }

    /**
     * Store a newly created contact from landing page.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string|max:1000',
        ]);

        Contact::create($validated);

        return redirect()->back()->with('success', 'Thank you for contacting us! We will get back to you soon.');
    }

    /**
     * Remove the specified contact.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        
        return redirect()->back()->with('success', 'Contact deleted successfully.');
    }
}