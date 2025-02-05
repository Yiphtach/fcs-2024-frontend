<%- include('partials/header') %>  <!-- Include the header partial -->

<main>
    <!-- About Section -->
    <section class="about">
        <h1>About This App</h1>
        <p>The Fight Simulation App allows you to experience exciting battles between your favorite comic book characters from various universes. 
        Using their unique stats and abilities, you can pit them against each other and see who comes out on top. Every fight is simulated in real-time,
        and detailed statistics are generated after each match.</p>

        <p>Our platform provides a leaderboard to track the performance of different characters, so you can see who reigns supreme based on their 
        win/loss record. Dive into the world of comic battles and analyze every move, stat, and ability to understand how each victory or defeat 
        was achieved.</p>

        <!-- Add Visual Appeal with an Image or Icon -->
        <img src="/images/fight-banner.jpg" alt="Comic Battle" class="about-image">

        <a href="/" class="btn-back-home">Back to Home</a>
    </section>
</main>

<%- include('partials/footer') %>  <!-- Include the footer partial -->

<!-- CSS Styles -->
<style>
    main {
        padding: 20px;
    }

    /* About Section */
    .about {
        padding: 40px;
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }
    .about h1 {
        font-size: 36px;
        margin-bottom: 20px;
        color: #333;
    }
    .about p {
        font-size: 18px;
        margin-bottom: 30px;
        line-height: 1.6;
        color: #555;
    }
    .about-image {
        width: 100%;
        height: auto;
        margin-bottom: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Added subtle shadow for visual appeal */
    }
    .btn-back-home {
        padding: 15px 25px;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        font-size: 18px;
        border-radius: 5px;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    .btn-back-home:hover {
        background-color: #45a049;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added shadow on hover for a more interactive feel */
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .about {
            padding: 20px;
        }
        .about h1 {
            font-size: 28px;
        }
        .about p {
            font-size: 16px;
        }
        .about-image {
            width: 100%;
        }
    }
</style>
