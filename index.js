const projects = [
    {
        id: "temperament",
        title: "Temperament",
        sub: "Unity - Programming and Level Design",
        video: "Temperament.mp4",
        summary: "A rhythm game created over the course of a semester with custom code architecture and rendering.",
        incomplete: false,
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
        title: "Commencement",
        sub: "Unity - Programming, Sequence Design, and Animation",
        video: "Commencement.mp4",
        summary: "Information.",
        incomplete: true,
        details: /*html*/ `
        Hello, world!
        `
    },
    {
        id: "ufs",
        title: "Untitled Forest Game",
        sub: "Unity - Programming and Graphical Effects",
        video: "UntitledForestGame.mp4",
        summary: "A six-week game featuring custom terrain generation that 'forgets' itself when you leave.",
        incomplete: false,
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
        title: "Boxes and Portals",
        sub: "Unity - Programming",
        video: "BoxesandPortals.mp4",
        summary: "Information.",
        incomplete: true,
        details: /*html*/ `
        Hello, world!
        `
    },
    {
        id: "domination",
        title: "Domination",
        sub: "Unity - Gameplay Programming",
        video: "Domination.mp4",
        summary: "Information.",
        incomplete: true,
        details: /*html*/ `
        Hello, world!
        `
    },
    {
        id: "chinnestre",
        title: "Chinnestre",
        sub: "Unity - Programming and Graphical Effects",
        video: "Chinnestre.mp4",
        summary: "Information.",
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

let str_if = (b, s, e) => b ? s : (e | "");

// Generate projects //
$(document).ready(function() {

    // Generate all project containers objects //
    var project_containers = /*html*/ `<div class="row">`;

    $.each(projects, function(index, project) {
        if (index % 2 === 0)
        {
            project_containers += /*html*/ `</div><div class="row">`;
        }

        project_containers += /*html*/ `
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
    });
    project_containers += /*html*/ `</div>`;

    $('#project-containers').append(project_containers);

    // Generate all details containers objects //
    var details_containers = '';

    $.each(projects, function(index, project) {
        details_containers += /*html*/ `
        <div class="collapse button-affected" id="details-${project.id}">
            <div class="bg-c-light rounded m-4 p-2 px-4">
                <h1><b>${project.title}</b></h1>
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
});