# Excellent Wisdom Students Alumni Association

A modern, responsive web application for the Excellent Wisdom Students NGO 2013 Alumni Association. Built with Vite and React, this platform helps classmates stay connected, manage contributions, and access important documents.

## Features

### 🏠 Home Section
- Welcome page with organization branding
- Quick navigation to all sections
- Display of organization logo and information

### 👥 Classmate Roster
- **Compact Design**: Optimized grid layout that displays more members in less space
- **Smart Search**: Search across all members with instant filtering
- **Pagination**: Navigate through large lists with 20 members per page
- **Responsive Design**: Adapts seamlessly to desktop, tablet, and mobile screens
- **Late Members Badge**: Visual indicator for late members

### 💰 Contribution Updates
- Track levy and support contributions
- Filter by contribution status (All, Active, Completed)
- View detailed payment information
- Paginated display of contribution events

### 📄 Documents Section
- Access to important organization documents
- Certificate and status report downloads
- Meeting minutes and other resources

### 👤 Profile Section
- Individual classmate profiles
- Personal information display
- Contribution history

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd excellent-wisdom-students

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
excellent-wisdom-students/
├── src/
│   ├── components/
│   │   ├── ContributionSection.jsx    # Contribution tracking
│   │   ├── DocumentsSection.jsx       # Document management
│   │   ├── HomeSection.jsx            # Landing page
│   │   ├── PageNav.jsx                # Navigation component
│   │   ├── ProfileSection.jsx         # User profiles
│   │   └── RosterSection.jsx          # Classmate list with pagination
│   ├── App.jsx                        # Main application component
│   ├── App.css                        # Global styles
│   ├── data.js                        # Application data
│   ├── ErrorBoundary.jsx              # Error handling
│   └── main.jsx                       # Application entry point
├── public/
│   └── logo.jpeg                      # Organization logo
├── index.html                         # HTML entry point
├── package.json                       # Project dependencies
├── vite.config.js                     # Vite configuration
└── README.md                          # Project documentation
```

## Technologies Used

- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with responsive design
- **JavaScript ES6+** - Modern JavaScript features

## Key Features Implementation

### Responsive Design
The application is fully responsive with breakpoints at:
- **Desktop**: Full layout with optimal spacing
- **Tablet (768px)**: Adjusted grid layouts and reduced spacing
- **Mobile (480px)**: Single-column layouts and compact elements

### Pagination
- 20 items per page for optimal performance
- Search works across all pages
- Automatic page reset when search term changes
- Professional, responsive pagination controls

### Compact Member List
- Reduced grid gaps and item padding
- Optimized column widths for more items per row
- Smaller, refined UI elements
- Maintained readability and usability

## Assets

The project includes the following assets:
- `logo.jpeg` - Organization logo
- `CERTIFICATE - EXCELLENT WISDOM STUDENTS NGO 2013 ALUMNI ASSOCIATION (1).pdf` - Official certificate
- `Status Report CAC - EXCELLENT WISDOM STUDENTS NGO 2013 ALUMNI ASSOCIATION.pdf` - Status report
- `AWS MEETING MINUTE.pdf` - Meeting minutes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and intended for use by the Excellent Wisdom Students NGO 2013 Alumni Association.

## Contact

For questions or support, please contact the association administrators.

---

**Excellent Wisdom Students NGO 2013 Alumni Association**
