<footer>
    <div class="container">
        <p>&copy; <%= new Date().getFullYear() %> Fight Simulation App. All rights reserved.</p>
        
        <nav role="navigation" aria-label="Footer Navigation">
            <ul class="footer-links">
                <li><a href="/" aria-label="Go to Home">Home</a></li>
                <li><a href="/fights" aria-label="Simulate a Fight">Simulate a Fight</a></li>
                <li><a href="/leaderboards" aria-label="View Leaderboard">Leaderboard</a></li>
                <li><a href="/about" aria-label="Learn More About the App">About</a></li>
            </ul>
        </nav>
    </div>
</footer>

<style>
    footer {
        background-color: #333;
        color: white;
        padding: 20px 0;
        text-align: center;
        font-size: 16px;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .footer-links {
        list-style: none;
        padding: 0;
        margin: 10px 0;
    }

    .footer-links li {
        display: inline;
        margin-right: 15px;
    }

    .footer-links li a {
        color: white;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-links li a:hover {
        color: #4CAF50;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .footer-links li {
            display: block;
            margin-bottom: 10px;
        }

        .footer-links {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>
