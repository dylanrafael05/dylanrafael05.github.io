const categories = [
    {
        id: "nongames",
        title: "Non-Games"
    },
    {
        id: "games",
        title: "Games"
    }
]

const projects = [
    // Non-games //
    {
        id: "rec",
        category: "nongames",
        title: "RE:C Programming Language",
        sub: "C#, LLVM, ANTLR - Language Design, Compiler Implementation, CLI Design",
        video: "",
        summary: "A custom programming language implemented in .NET via C# with the help of ANTLR for parsing and LLVM for final phases of compilation.",
        incomplete: false,
        link: "https://github.com/dylanrafael05/rec",
        details: String.raw/*html*/ `
        <p class="lead">
            Re:C is a programming language designed and implemented by me during a single semester for RPI's RCOS open source software course.
            It features a mix of C and Rust syntax and aims to take advantage of the simplicity of languages like C while providing helpful
            features borrowed from more modern languages.
        </p>

        <p>
            The compiler for Re:C was implemented in C#, employing many modern language features like
            generators, algebraic data types, and the <code>Expression</code> API. This allowed me to
            explore and familiarize myself with modern <code>.NET</code> development and features.
            This project help me learn about more than modern programming though, since the creation of
            the compiler also involved interfacing with low-level APIs like <code>LLVM</code>, as well as 
            generating low-level bytecode from input programs. This meant that I also gained a richer 
            understanding of low-level programming, including memory allocation schemes, object-oriented
            implementation, control flow management, and compiler theory.
        </p>

        <p>
            This project also helped me to better understand my programming style, since designing my
            own language allowed me to set style precedents and bake them partially into the language.
        </p>
        `
    },
    {
        id: "fstd",
        category: "nongames",
        title: "FSTD",
        sub: "C - Programming, API Design",
        video: "",
        summary: "An opinionated, macro-based core library implementation for C,",
        incomplete: false,
        link: "https://github.com/dylanrafael05/FSTD",
        details: String.raw/*html*/ `
        <p class="lead">
            FSTD was created during a summer semester as a pet project to explore the possibilities
            of the C programming language. It features macro-based type polymorphism, modern string
            formatting libraries, allocation handling, and minimal type reflection.
        </p>

        <p>
            A major part of this project was learning and expirementing with the features of the C
            programming language; trying to create an easy-to-work-with programming environment for
            modern development. This involved the creation of various helper macros which allowed
            for definitions of ADTs, reflectable enums, and customizeable string formatting.
        </p>

        <p>
            This process also allowed me to familiarize myself with development in C,
            and has helped me to become comfortable working in the language, even on larger
            scale projects.
        </p>
        `
    },
    {
        id: "dib",
        category: "nongames",
        title: "dib Engine",
        sub: "C++ - Programming, API Design",
        video: "",
        summary: "Custom ECS-based game engine and utilities library built on C++26 via experimental clang and raylib.",
        incomplete: false,
        link: "https://github.com/dylanrafael05/dib",
        details: String.raw/*html*/ `
        <p class="lead">
            <code>dib</code> was created over the course of two summers to help me learn how ECS architecture works,
            and to experiment with advanced C++ features, as well as C++26 features. It is still actively 
            under development, being used for my personal projects.
        </p>

        <p>
            <code>dib</code> is designed to produce clean code that fits well within ECS archeticture without sacrificing
            too much performance. For example, the following code outlines how one could create a simple program that prints
            <code>"Hello, World"</code> upon starting, and <code>"Hello, Again!"</code> every frame.
        </p>

        <pre><code class="language-cpp">
        void my_start()
        {
            LOG("Hello, World");
        }

        void my_update()
        {
            LOG("Hello, Again!");
        }

        int main(int argc, char **argv)
        {
            this_app()
                
                // Setup our application's logic
                .initialize(argc, argv)
                .add_systems({
                    { groups::Start, my_start },
                    { groups::Update, my_update }
                })

                // Setup our window
                .set_dimensions(1200, 1000)
                .set_fps(60)

                // Begin execution
                .run();
        }
        </code></pre>

        <p>
            The ECS implementation that is used stores all components for entities of a
            given archetype contiguously in memory, condensing memory accesses of entities of
            the same type into contained regions. Implementing this without creating unrealistic
            compile times due to template instantiation for each component type required creating
            an extensive type-erasure system. This API was designed to give access to many general 
            operations (such as default construction, copy construction, relocation (when a <code>memcpy</code>
                is valid for moving a type), destruction, hashing, and equality comparison)
            on a void-pointer style reference to arbitrary data.
        </p>

        <hr>
        <p>
            <code>dib</code> uses C++26's reflection features to mark types as ECS components, 
            singleton pattern compatible, record-like, or even automatically serializable. For example,
            only types annotated with <code>[[=dib::ecs::component]]</code> can be passed to 
            <code>EntityID::add_component&lt;T&gt;(T &&)</code>. This makes loading data from disk
            trivial!
        </p>

        <pre><code class="language-cpp">
        // Enums can automatically be converted to/from json!
        // No more manual to-string!
        enum class [[=json::derive]] HealingType
        {
            CanHeal,
            CannotHeal
        };

        // Types marked as records implicitly generate operator==,
        // std::hash, and json serialization
        struct [[=record, =res::json_resource]] PlayerSettings
        {
            float movement_speed;
            u64 max_health;
            HealingType healing;

            // Container types are automatically handled //
            structures::Vector&lt;std::string&gt; invalid_names;
        };

        // Settings can be loaded from disk manually...
        auto load_settings_man(std::filesystem::path &&from)
        {
            std::ifstream file(MOVE(from));
            json::JsonReader jread(file);

            // This call will use std::meta to determine how to
            // serialize PlayerSettings!
            PlayerSettings result;
            jread.read(result);

            return result;
        }

        // ... or via the resource API!
        auto load_settings_res(std::string_view resource)
        {
            auto handle = resources().get&lt;PlayerSettings&gt;(resource);

            // The resource API not only loads from disk automatically,
            // but it will also automatically update if the underlying
            // file is updated when in debug mode!

            // This API also uses the aforementioned type-erasure system
            // in an attempt to reduce compile times for games.
            auto speed = handle->movement_speed;
        }
        </code></pre>

        <hr>
        <p>
            Finally, since <code>dib</code> has been a pet project of mine for
            a decent chunk of time, it has also become a playground for me to
            explore data structure design and find what code formatting works best
            for me. This has led me to create custom <code>Vector&lt;T&gt;</code>,
            <code>Option&lt;T&gt;</code>, and similar "vocabulary-level" types that
            merge the standard library's design with features that I have found helpful,
            as well as with optimizations for my specific use case.
        </p>

        <p>
            This project has, as a result of the large amount of work that I have put into it,
            become an incredible tool for my learning, and has helped me familiarize myself with
            the ins and outs of both low- and high-level API design. I am incredibly proud of what
            I have been able to achieve with this project, and am still continuing work on it in
            hopes that I can continue to create meaningful features, expirement with bleeding-edge
            technologies in C++ and game development, and improve my programming skills.
        </p>
        `
    },

    // Games //
    {
        id: "temperament",
        category: "games",
        title: "Temperament",
        sub: "Unity - Programming and Level Design",
        video: "Temperament.mp4",
        summary: "A rhythm game created over the course of a semester with custom code architecture and rendering.",
        incomplete: false,
        link: "https://shapeguy.itch.io/temperament",
        details: String.raw/*html*/ `
        <p class="lead">
            Temperament was created as a group project for RPI's Game Development 2 course. The original concept, much of the level design,
            as well as all of the rhythm game gameplay and editor tooling was implemented by me.
        </p>

        <p>
            In order to implement the rhythm gameplay, I created various data structures and algorithms, including a custom-built set of classes
            <code>Sequence&ltT&gt</code>, <code>Timeline&ltT&gt</code>, and <code>IntegrableTimeline&ltT&gt</code> which store objects with an associated timestamp
            in chronological order for efficient, <span class="math-katex">\mathrm{O}(\log n)</span> lookup, and provide utilities for interpolating and integrating floating point values from these objects.
            This system also uses a custom <code>Easing</code> class, which provides simple easing functions to allow for expressive timelines without
            the need for bezier curves.
        </p>
        
        <figure class="figure">
            <div class="figure-img img-fluid rounded">
                <video src="videos/SpeedGimmicks.mp4" width="320" muted autoplay loop>
            </div>
            <figcaption class="figure-caption textcol">
                Because of this work, the engine supports advanced speed gimmicks, as are seen in other modern rhythm games like <i>Pump It Up</i>,
                <i>Arcaea</i>, and <i>Rizline</i>.
            </figcaption>
        </figure>

        <p>
            I also developed a fully-featured level editor, supporting snapping to the beat, snapping to a horizontal grid, undo/redo, copy/paste, 
            multiselect, editing notes without deleting them, mirroring notes horizontally, and creating/editing speed gimmicks.
        </p>

        <hr>

        <p>
            On the non-programming side of the game, I was also responsible for designing a majority of the levels included in the game.
            As an avid rhythm-game player, and enthusiast of fanmade rhythm-game content, I have gained decent skills in the process of 'charting'
            songs. I have even <a href="https://www.youtube.com/watch?v=Myzhn7txFgk">won a fanmade charting competition for my work on a gimmick chart.</a>
        </p>
        `
    },
    {
        id: "commencement",
        category: "games",
        title: "Commencement",
        sub: "Unity - Programming, Sequence Design, and Animation",
        video: "Commencement.mp4",
        summary: "Information coming soon!",
        incomplete: true,
        details: String.raw/*html*/ `
        Hello, world!
        `
    },
    {
        id: "ufs",
        category: "games",
        title: "Untitled Forest Game",
        sub: "Unity - Programming and Graphical Effects",
        video: "UntitledForestGame.mp4",
        summary: "A six-week game featuring custom terrain generation that 'forgets' itself when you leave.",
        incomplete: false,
        link: "https://shapeguy.itch.io/untitled-forest-game",
        details: String.raw/*html*/ `
        <p class="lead">
            Untitled Forest Game was created as a group project for RPI's Experimental Game Design course. The terrain generation system was
            built from scratch by me during the six weeks we had to create the game.
        </p>

        <p>
            The core concept behind this game was that the terrain you see would regenerate whenever you leave an area and return to it,
            but would remain smooth. To achieve this affect, I wrote a custom implementation of <i>perlin noise</i>, which cached the gradients
            used to calculate the noise for later use, but exposed the ability to 'forget' those gradients to the API's user, allowing them to 
            essentially 'reroll' the noise randomization whenever terrain is regenerated.
        </p>

        <p>
            Due to this, the generation process was slower than that of a traditional terrain generator, and as such needed to be parallelized.
            As such, the entire generation system was designed to be thread-safe, allowing for chunks to be generated (and forgotten) at the same time,
            even despite Unity's main-thread limitations.
        </p>
        `
    },
    {
        id: "boxesandportals",
        category: "games",
        title: "Boxes and Portals",
        sub: "Unity - Programming",
        video: "BoxesandPortals.mp4",
        summary: "A portal-based platformer created in Unity2D",
        incomplete: false,
        link: "https://flofplusplus.itch.io/boxes-and-portals",
        details: String.raw/*html*/ `
        
        <p class="lead">
            Boxes and Portals was created for RPI's Intro to Game Programming course, for our 'create a physics-based game' assignment.
        </p>

        <p>
            Taking inspiration from Valve's Portal, Boxes and Portals implements a robustand extensible portal system for Unity2D, permitting
            practically arbitrary rigidbodies from passing through (and thus rendering on both sides of) portals placed in the scene view. Developing
            this system helped me to learn more about matrices and transformations in game systems. This knowledge has helped me greatly when working 
            with shaders and graphics APIs.
        </p>

        <p>
            Due to the tight schedule of the game's development, it was crucial that time could be saved when designing the game's contiguous level.
            To do this, I created a shader which would use world-space coordinates to sample textures for the rock and grass that comprise the level's
            boundaries. This shader automatically detected where grass should be placed, and made it so that the level could be constructed with
            overlapping primitive shapes without compromising the game's aesthetic.
        </p>

        <!-- COMPLETE MORE -->

        `
    },
    {
        id: "domination",
        category: "games",
        title: "Domination",
        sub: "Unity - Gameplay Programming",
        video: "Domination.mp4",
        summary: "Information coming soon!",
        incomplete: true,
        details: /*html*/ `
        Hello, world!
        `
    },
    {
        id: "chinnestre",
        category: "games",
        title: "Chinnestre",
        sub: "Unity - Programming and Graphical Effects",
        video: "Chinnestre.mp4",
        summary: "Information coming soon!",
        incomplete: true,
        details: /*html*/ `
        Hello, world!
        `
    }
];

let col = (s) => {
    return [
        parseInt(s.substring(1, 3), 16) / 255,
        parseInt(s.substring(3, 5), 16) / 255,
        parseInt(s.substring(5, 7), 16) / 255,
        1
    ];
};

let str_if = (b, s, e) => b ? s : (e || "");

function header(title) 
{
    return /*html*/`
    <div class="justify-content-center">
        <div class="bg-c-light rounded m-4 p-2 px-4 pb-1 text-center">
            <p class="display-6"><b>${title}</b></p>
        </div>
    </div>
    `
}

// Generate projects //
$(document).ready(function() {

    // Generate all divisions of projects //
    $.each(categories, function(_, cat)
    {
        $("#project-containers").append(/*html*/`
            ${header(cat.title)}
            <div id="projects-${cat.id}"></div>
        `);
    });

    // Generate all project containers objects //
    const classes = {};

    function get_class(cls) 
    {
        if (cls in classes)
        {
            return classes[cls];
        }

        classes[cls] = {
            html: /*html*/ `<div class="row">`,
            count: 0
        };
        return classes[cls];
    }

    $.each(projects, function(index, project) {

        var cls = project.category;
        
        if (get_class(cls).count % 2 === 0)
        {
            get_class(cls).html += /*html*/ `</div><div class="row">`;
        }

        get_class(cls).html += /*html*/ `
        <div class="col my-2">
            <div class="card bg-c-light textcol border-0 border-white">
                <!-- <video class="card-img-top" src="${project.video}" muted autoplay loop></video> -->
                <div class="card-body">
                    <h5 class="card-title"><b>${project.title}</b></h5>
                    <h6 class="card-subtitle mb-2">${project.sub}</h6>
                    <div class="card-text">${project.summary}</div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-custom w-100" type="button" id="open-details-${project.id}" ${str_if(project.incomplete, "disabled")}>
                        ${project.incomplete ? "<i>Section coming soon!</i>" : "<i>Learn more...</i>"}
                    </button>
                </div>
            </div>
        </div>
        `;

        get_class(cls).count++;

    });
    
    $.each(classes, function(cls, inst)
    {
        inst.html += /*html*/`</div>`;
        $(`#projects-${cls}`).append(inst.html);
    })

    // Generate all details containers objects //
    var details_containers = '';

    $.each(projects, function(index, project) {
        details_containers += String.raw/*html*/ `
        <div class="collapse button-affected" id="details-${project.id}">
            <div class="bg-c-light rounded m-4 p-2 px-4">
                <h1><b>${str_if(
                    project.link !== undefined, 
                    String.raw/*html*/`<a href="${project.link}">${project.title}</a>`, 
                    project.title)}</b></h1>
                <h3>${project.sub}</h3>
                <hr>
                ${project.details}
                <hr>
                <div class="d-flex justify-content-center mt-2">
                    <button class="btn btn-custom w-100" type="button" id="close-details-${project.id}">
                        <i>Back</i>
                    </button>
                </div>
            </div>
        </div>
        `;
    });
    
    $('#details-containers').append(details_containers);
    
    // Add resume //
    $("#project-containers").append(String.raw/*html*/`
        ${header("Resume")}
        <div class="d-flex justify-content-center">
            <div class="d-flex justify-content-center w-50 bg-c-light rounded m-4 p-2 px-4">
                <button class="btn btn-custom w-100" type="button" id="open-resume">
                    <i>Open resume...</i>
                </button>
            </div>
        </div>
    `);
    
    // Apply all hooks //
    $.each(projects, function(index, project) {
        let $open = $(`#open-details-${project.id}`);
        let $close = $(`#close-details-${project.id}`);
        let $details = $(`#details-${project.id}`);
        let $projects = $(`#project-containers`);

        $open.on('click', function() {
            $projects.hide();
            $details.show();
        });
        $close.on('click', function() {
            $details.hide();
            $projects.show();
        });
    });

    $(`#open-resume`).on('click', function() {
        window.open('resume.pdf', '_blank')
    });

    // Copy in background shader //
    $('#background').text(/*frag*/ `
    precision highp float;

    // Constants //
    #define PI    (3.1415926535)
    #define TWOPI (2.*PI)

    // Uniforms //
    uniform float time;
    uniform vec2 resolution;
    uniform vec4 main_color;
    uniform vec4 secondary_color;

    // Permutation and hashing functions //
    float permute(float x){
        return mod((x + 1.) * 20.129 + 301. / (abs(x) + 1.), 1.0);
    }
    vec2 permute(vec2 x){
        return vec2(
            permute((permute(x.x) + 1.) / (permute(x.y) + 1.)), 
            permute((permute(x.x) + 1.) * (permute(x.y) + 1.))
        );
    }
    vec3 permute(vec3 x){
        return vec3(
            permute(1. * (permute(x.x) + 1.) / (permute(x.y) + 1.) * (permute(x.z) + 1.)), 
            permute(1. / (permute(x.x) + 1.) * (permute(x.y) + 1.) / (permute(x.z) + 1.)), 
            permute(1. / (permute(x.x) + 1.) / (permute(x.y) + 1.) / (permute(x.z) + 1.))
        );
    }

    float hash(float x){
        return permute(permute(x));
    }
    vec2 hash(vec2 x){
        return permute(permute(x));
    }
    vec3 hash(vec3 x){
        return permute(permute(x));
    }

    // Implementation of perlin noise //
    vec3 perlin_gradient(vec3 x){
        vec3 hashed = hash(x);
        vec3 rand = sign(hashed - .5) * pow(abs(hashed - .5), vec3(0.8)) + .5;
        return normalize(rand * 2. - 1.);
    }

    #define I3D(i, j, k) (i)*4 + (j)*2 + k

    float perlin(vec3 x)
    {
        float dots[8];

        // Fill out the dot products for each of the eight cubic corners //
        for(int i = 0; i <= 1; i++)
        {
            for(int j = 0; j <= 1; j++)
            {
                for(int k = 0; k <= 1; k++)
                {
                    vec3 corner = vec3(
                        floor(x.x) + float(i), 
                        floor(x.y) + float(j), 
                        floor(x.z) + float(k));

                    vec3 grad = perlin_gradient(corner);
                    dots[I3D(i, j, k)] = dot(x - corner, grad);
                }
            }
        }

        // Find the interpolation parameters //
        vec3 s = vec3(
            smoothstep(0., 1., mod(x.x, 1.)),
            smoothstep(0., 1., mod(x.y, 1.)),
            smoothstep(0., 1., mod(x.z, 1.)));

        // Perform the 3-d interpolation //
        return mix(
            mix( // x = 0
                mix( // y = 0
                    dots[I3D(0, 0, 0)],
                    dots[I3D(0, 0, 1)],
                    s.z
                ),
                mix( // y = 1
                    dots[I3D(0, 1, 0)],
                    dots[I3D(0, 1, 1)],
                    s.z
                ),
                s.y
            ),
            mix( // x = 1
                mix( // y = 0
                    dots[I3D(1, 0, 0)],
                    dots[I3D(1, 0, 1)],
                    s.z
                ),
                mix( // y = 1
                    dots[I3D(1, 1, 0)],
                    dots[I3D(1, 1, 1)],
                    s.z
                ),
                s.y
            ),
            s.x
        ) / 2. + .5;
    }

    float perlin(vec2 pos, float scale, float timescale, float offset) {
        return perlin(vec3(pos * scale, timescale * time + offset));
    }

    // Helper functions //
    vec2 rotate(vec2 pos, float amt) {
        float c = cos(amt), s = sin(amt);
        return vec2(
            c * pos.x - s * pos.y,
            s * pos.x + c * pos.y
        );
    }

    vec2 rotate_fancy(vec2 pos, float amt) {
        return rotate(pos, amt / length(pos));
    }

    vec2 normalize_uv(vec2 uv) {
        return (uv - resolution / 2.) / min(resolution.x, resolution.y) * 2.;
    }

    float linearstep(float e0, float e1, float x)
    {
        if(e0 < e1) {
            return x < e0 ? 0.
                 : x > e1 ? 1.
                 : (x - e0) / (e1 - e0);
        }
        else {
            return x < e1 ? 1.
                 : x > e0 ? 0.
                 : 1. - (x - e1) / (e0 - e1);
        }
    }

    // Main shader code //
    void main() {
        const float minfac = 1.5;
        const float weightfac = 2.0;
        const float fadedist = 0.3;
        const float vigdist = 0.5;
        const float vigmul = 0.7;

        // Find the normalized uv of the frag coord, as well as the bounds for the uvs //
        vec2 pos = normalize_uv(gl_FragCoord.xy);
        vec2 minpos = normalize_uv(vec2(0.));
        vec2 maxpos = normalize_uv(resolution);

        // Compute locations of 'orbits', where the swirls fall towards //
        // Note that the second orbit has position equal to the negative of the first //
        vec2 orbitVector = vec2(0.4 + 0.1 * (sin(time * 0.03) * .5 + .5), 0);
        vec2 orbitPos = rotate(orbitVector, cos(time * 0.01) + time * 0.1);

        // Compute the swirl factor via perlin noise, then swirl our position around //
        // both orbits individually //
        float swirl = perlin(pos, 2., 0.1, 0.);
        vec2 swirledA = rotate_fancy(pos + orbitPos, swirl * TWOPI) - orbitPos;
        vec2 swirledB = rotate_fancy(pos - orbitPos, swirl * TWOPI) + orbitPos;

        // Sample a noise texture for each orbit //
        float noiseA = perlin(swirledA, 3., 0.01, 0.);
        float noiseB = perlin(swirledB, 3., 0.01, 10.);

        // Compute the weights corresponding to how close we are to each orbit //
        float distA = length(+1. * orbitPos - pos);
        float distB = length(-1. * orbitPos - pos);

        float weightA = (smoothstep(0., fadedist, distA) / weightfac) + (1. - 1. / weightfac);
        float weightB = (smoothstep(0., fadedist, distB) / weightfac) + (1. - 1. / weightfac);
        
        float weightOppA = (smoothstep(0., fadedist + 0.1, distA) / weightfac) + (1. - 1. / weightfac);
        float weightOppB = (smoothstep(0., fadedist + 0.1, distB) / weightfac) + (1. - 1. / weightfac);

        // Darken the result around the orbits //
        noiseA *= weightA * weightB;
        noiseB *= weightA * weightB;

        // And darken each noise layer independently if it is close to its opposite orbit //
        noiseA *= weightOppA;
        noiseB *= weightOppB;

        // And combine via max //
        float maxNoise = max(noiseA, noiseB);

        // Drop the black point of our noise, since it is more likely to be a greater value //
        // now that it has been combined //
        float noise = clamp(
            minfac * (maxNoise - 1. + 1. / minfac),
            0., 1.);

        // Compute the strength of the vignette effect //
        vec2 vignetteDists = min(abs(pos - minpos), abs(pos - maxpos));
        float vignetteDist = min(vignetteDists.x, vignetteDists.y);
        float vignette = linearstep(vigdist, 0., vignetteDist);

        gl_FragColor = mix(
            secondary_color,
            main_color,
            smoothstep(0., 1., noise)
        );
        gl_FragColor *= mix(1., vigmul, vignette);
    }    
    `);

    // Apply background //
    shaderWebBackground.shade({
        shaders: {
            background: {
                uniforms: {
                    time: (gl, loc) => gl.uniform1f(loc, performance.now() / 1000),
                    resolution: (gl, loc, ctx) => gl.uniform2f(loc, ctx.width, ctx.height),
                    main_color: (gl, loc) => gl.uniform4fv(loc, col('#654838')),
                    secondary_color: (gl, loc) => gl.uniform4fv(loc, col('#2b1c11'))
                }
            }
        }
    });

    // Render all KaTeX //
    // Adapted from https://sixthform.info/katex/guide.html //
    let allkatex = document.getElementsByClassName('math-katex');

	for (let i = 0; i < allkatex.length; i++) 
    {
        let item = allkatex[i];

        try 
        {
            katex.render(item.textContent, item);
        }
        catch(err) 
        {
            item.style.color = 'red';
            item.textContent = err;
		}
	}

    // Update highlighting for code blocks //
    hljs.highlightAll();
});