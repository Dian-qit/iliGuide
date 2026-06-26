DROP DATABASE IF EXISTS iliGuideDb;
CREATE DATABASE iliGuideDb;
USE iliGuideDb;

-- ============================================================
-- CREATE TABLES
-- ============================================================

CREATE TABLE Tourist (
    TouristID INT AUTO_INCREMENT PRIMARY KEY,
    Name      VARCHAR(100) NOT NULL,
    Email     VARCHAR(100) NOT NULL UNIQUE,
    Password  VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE TouristSpot (
    DestinationID INT AUTO_INCREMENT PRIMARY KEY,
    Name          VARCHAR(150) NOT NULL,
    Address       VARCHAR(255),
    City          VARCHAR(100),
    Description   TEXT,
    Experience    TEXT,
    ImageURL      VARCHAR(1000), -- Increased length to safely store full CDN parameters
    EmbedMapURL   VARCHAR(500),
    EntranceFee   DECIMAL(10, 2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB;

CREATE TABLE Activities (
    ActivityID          INT AUTO_INCREMENT PRIMARY KEY,
    DestinationID       INT NOT NULL,
    ActivityName        VARCHAR(100) NOT NULL,
    ActivityDescription VARCHAR(255),
    CONSTRAINT fk_activity_spot
        FOREIGN KEY (DestinationID) REFERENCES TouristSpot(DestinationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Reviews (
    ReviewID      INT AUTO_INCREMENT PRIMARY KEY,
    TouristID     INT     NOT NULL,
    DestinationID INT     NOT NULL,
    Rating        TINYINT NOT NULL,
    ReviewDate    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Comment       TEXT,
    CONSTRAINT chk_rating CHECK (Rating BETWEEN 1 AND 5),
    CONSTRAINT fk_review_tourist
        FOREIGN KEY (TouristID) REFERENCES Tourist(TouristID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_review_destination
        FOREIGN KEY (DestinationID) REFERENCES TouristSpot(DestinationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- TOURIST SPOTS (Iligan City Data Sync)
-- ============================================================
INSERT INTO TouristSpot (DestinationID, Name, Address, City, Description, Experience, ImageURL, EmbedMapURL, EntranceFee) VALUES
(
  1, 
  'Maria Cristina Falls', 
  'Misamis Oriental-Maria Cristina Falls Road, Maria Cristina', 
  'Iligan City', 
  'The landmark majestic twin falls of Iligan City, powering the Agus VI Hydroelectric Plant.', 
  'Standing at the viewing deck of Maria Cristina Falls, you are immediately humbled by the sheer, terrifying power of nature. Known as the "Twin Falls," a massive boulder splits the rushing waters at the precipice, sending two parallel columns of white foam crashing 320 feet down into the churning river below. The air is thick with a heavy, cold mist that instantly dampens your skin, and the continuous roar of the water is so deep it resonates straight through your chest. Beyond its breathtaking, fierce beauty, Maria Cristina holds a quiet duality: it is both a legendary natural wonder and the primary lifeblood of Mindanao, fueling the Agus VI Hydroelectric Plant to supply electricity across the region. Watching the unrelenting torrent slice through the dense, vibrant green foliage of the surrounding cliffs makes you realize why this waterfall remains the undisputed crown icon of Iligan\'s "City of Majestic Waterfalls." It is a raw, unforgettable display of industrial utility and natural majesty existing in perfect harmony.', 
  'https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_576/MTc2NDU3MjQ0NzYwODc2MjQ1/the-legend-of-maria-cristina-falls.webp', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.192997844004!2d124.18962778405125!3d8.183303880651707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32559fab7e18da13%3A0xd03f7fe048acec7!2sMaria%20Cristina%20Falls!5e0!3m2!1sen!2sph!4v1780417257184!5m2!1sen!2sph', 
  50.00
),
(
  2, 
  'Tinago Falls', 
  'Barangay Ditucalan', 
  'Iligan City', 
  'A stunning waterfall hidden deep within a ravine, featuring a deep, blue-green plunge pool.', 
  'True to its name, which means "hidden," reaching Tinago Falls feels like uncovering a secret paradise locked away from the modern world. Your journey begins with a steep descent down a winding staircase of approximately 500 stone steps, carved into a lush, jungle-covered ravine. As you trek lower, the ambient noise of the outside world slowly fades away, replaced by the crisp, echoing sound of cascading water. Reaching the bottom reveals a view that completely steals your breath: a wide, high crescent cliff where sheets of silk-white water drape over mossy rocks, plunging gracefully into a deep, mesmerizingly blue-green basin. The water is staggeringly cold, instantly washing away the fatigue of the hike. You can board a traditional bamboo raft, pulled by guides directly into the heavy spray beneath the falls, allowing you to venture behind the watery curtain to explore a small, hidden cave. Surrounded by towering rock faces draped in vines, Tinago feels completely otherworldly, offering an intimate communion with one of the most magical aquatic sanctuaries in the country.', 
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9HSz6XbCkf361i9SzYZ7DNxb9HfPPRMb_OrOtpQmbVOGbZjtFEBeC6SVhX5GRgV-Ut5bxPfTfXjTtiM6DX_4ygDnJAEHiLkTPr2qK1wBZgij5IQzeBusWuercaiNPGkFi60KXrK-CzUM/s1600/Tinago+Falls_Iligan+City.JPG', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d505386.83980750386!2d124.17252978240461!3d8.269447261088741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32559f3d37333c5b%3A0x9666233250c8e02c!2sTinago%20Falls!5e0!3m2!1sen!2sph!4v1780417154039!5m2!1sen!2sph', 
  50.00
),
(
  3, 
  'Maze Parks and Resort', 
  'Barangay Buru-un', 
  'Iligan City', 
  'A relaxing family resort surrounded by lush greenery, natural spring water, and simple labyrinth walkways.', 
  'Stepping into Maze Parks and Resort offers an immediate change of pace, wrapping you in a peaceful atmosphere dominated by towering trees and the comforting murmur of flowing water. This sprawling eco-resort is designed for leisure and family bonding, characterized by its winding pathways that snake through manicured lawns and lush tropical gardens. The highlight of the resort is its unique maze-like configuration of footpaths that invite visitors to slow down, wander, and explore the green nooks of the property. fed entirely by natural underground springs, the swimming pools offer clean, non-chlorinated, and deeply refreshing waters that serve as the ultimate antidote to the humid tropical sun. Families gather under rustic open-air cottages, children play along the bridges crossing stream channels, and the canopy of leaves overhead provides an endless supply of cool shade. It is a place where nature meets recreational comfort, offering a gentle, grounded slice of countryside relaxation without having to journey too far from the city center.', 
  'https://www.phtourguide.com/wp-content/uploads/2010/03/SNC00013.jpg', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.2174725123896!2d124.17777627571965!3d8.180834301687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32559fa7331937db%3A0x1cb92bea54492120!2sMaze%20Parks%20and%20Resort!5e0!3m2!1sen!2sph!4v1780417685778!5m2!1sen!2sph', 
  50.00
),
(
  4, 
  'Paseo De Santiago', 
  'Santiago, Barangay Barangay San Roque', 
  'Iligan City', 
  'An open-air, seaside commercial complex featuring iconic large ILIGAN CITY lettering and dynamic sunset views.', 
  'As the afternoon heat begins to wane, local life gravitates toward the open-air, seaside promenade of Paseo De Santiago. Facing the vast expanse of Iligan Bay, this vibrant coastal park provides the perfect vantage point for watching the sky transform into a dramatic canvas of deep pink, gold, and burning violet during sunset. The park proudly features massive, free-standing "ILIGAN CITY" and "PHILIPPINES" letters that act as a visual magnet for photographers and tourists seeking to document their visit. Once dusk falls, the energy shifts seamlessly into a lively social hub. Strings of warm, golden bulb lights illuminate the seaside pathways, while the aroma of sizzling street food, grilled meats, and local delicacies drifts from an array of open-air stalls. Friends and families gather around plastic tables, enjoying cold drinks and listening to live acoustic bands whose music blends effortlessly with the steady, calming rhythm of waves breaking against the seawall. It is a living, breathing celebration of local community spirit and coastal beauty.', 
  'https://scontent.fcgy1-3.fna.fbcdn.net/v/t39.30808-6/503687033_2066406927179534_4542915655230568428_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFWQnusg3lcc2GXndmxLzf8BKHr3dQ5wA8Eoevd1DnAD7i5jP_vKS8sIq3pRMSYO6yDRNB1wtzU-cPZRKozubLt&_nc_ohc=WxcS0AxpXJEQ7kNvwE77N_K&_nc_oc=Adq-TybTUXFLyPTrINgWsVuhX6Cq74Qr9gW9cB7OC6H09dWdDcesnATHOYbr5q4SdRlIKCFF0HYjxXjHzsdindi3&_nc_zt=23&_nc_ht=scontent.fcgy1-3.fna&_nc_gid=Eky4ZU3IWjtbpIMXTfqdhQ&_nc_ss=7c2a8&oh=00_Af_M4jaj6Dfe_qUs84JzRq5CKTGZkLdM8bWP2WBnerkd3A&oe=6A24C61F', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.5811454742834!2d124.2395233257199!3d8.244803150769512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325575d5f674000b%3A0xda336d9463b5f4a4!2sPaseo%20De%20Santiago%2C%20Balite%20Dr%2C%20Iligan%20City%2C%209200%20Lanao%20del%20Norte!5e0!3m2!1sen!2sph!4v1780417892564!5m2!1sen!2sph', 
  20.00
),
(
  5, 
  'Hindang Caves and Wild Monkeys', 
  'Barangay Hindang', 
  'Iligan City', 
  'A series of natural limestone caves nestled in a forested mountain slope, inhabited by free-roaming wild monkeys.', 
  'For those who yearn for a touch of rugged wilderness and wildlife interaction, Hindang Caves offers an enchanting mountain adventure. Tucked away on a densely forested slope, the journey up introduces you to a network of ancient limestone cave systems, each displaying unique, cathedral-like chambers filled with jagged stalactites and stalagmites formed over thousands of years. But the true charm of Hindang lies in its untamed, long-term inhabitants?a thriving community of wild macaque monkeys that roam freely across the forest canopy. As you approach the cave grounds, you will hear their rustling in the treetops long before they descend onto the pathways. These monkeys are remarkably accustomed to human presence, often observing travelers with curious eyes from the branches or cautiously approaching visitors who offer simple fruits. Walking through the cool, dark limestone corridors while knowing a wild wildlife sanctuary thrives right outside the cave entrance creates a thrilling, primitive connection with nature that feels completely unscripted.', 
  'https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/710226927_4161343720675668_1677747146651257727_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFsZGBk17AKgOspircHqbZjBMDFOIqDQXgEwMU4ioNBeAzpPIm6ZZD8wiwAjhV4Kyr6wbfbQPpHxHHbEbms8y4E&_nc_ohc=SEwCKGdCDx0Q7kNvwG5Upf1&_nc_oc=Adrgk4pK-xlrZOhcVZ5gC6AWMAgZAtZCxdIZT68iHP6xcwIiY-7aVMLj8HRVR_bYkoqQO6jAHPuCOXxVMNP3opiv&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=1Cd-lmKq5Zmz4RJy3F6aGA&_nc_ss=7c2a8&oh=00_Af-acSPD9ETe2oAvmW4zz5VLYbPXVkDboqc7Cp8nNxmR0w&oe=6A24C2F7', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24733.83375997362!2d124.71072965128637!3d10.456275385628276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x330771d97d8630d3%3A0xbcc536c372c6dc9b!2sHindang%20Cave%20and%20Wild%20Monkeys!5e0!3m2!1sen!2sph!4v1780418285841!5m2!1sen!2sph', 
  25.00
),
(
  6, 
  'Dalipuga Centennial Park', 
  'National Highway, Barangay Dalipuga', 
  'Iligan City', 
  'A refreshing public park by the coast, famous for its old sprawling trees and sea wall.', 
  'Dalipuga Centennial Park captures the quiet, nostalgic essence of coastal living in Iligan. Situated right along the edge of the national highway, this coastal public strip is defined by its massive, centuries-old acacia trees whose thick, sprawling branches extend over the grounds like giant, protective green umbrellas. Early mornings here are peaceful and crisp; you can watch fitness enthusiasts jogging down the paved lanes, cyclists catching the morning draft, and elderly locals sitting quietly on the stone sea wall. The park sits directly adjacent to a rocky coastline where the clear sea water breaks rhythmically against concrete barriers. By mid-afternoon, the park becomes a shaded sanctuary where students read, couples stroll, and vendors sell chilled coconuts and local snacks. Standing at the edge of the park with the salty sea breeze rustling through the ancient leaves above, Dalipuga offers a simple, meditative space to pause, reflect, and enjoy the beautiful horizon of the bay.', 
  'https://scontent.fcgy1-3.fna.fbcdn.net/v/t39.30808-6/483814043_963821722553694_29007138674323089_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeGCWRGgy7Lu_jj26W3LHRXsl0Az60XjX_6XQDPrReNf_o77tXztfa10L8wlCJjz7M7R_obEMKlBBX1tichJlfy8&_nc_ohc=Zx9oM1qEko8Q7kNvwHrU2fK&_nc_oc=AdrTx1si5gKsv7sDe2mUwQkFzYCZQhUJvkgxn43pgwGep_lvq1SdOxD0iEA8MMm1AtkqRE2SFw5Qx4mZvsDVpZP4&_nc_zt=23&_nc_ht=scontent.fcgy1-3.fna&_nc_gid=7ioTE9myVsbPUiADEnUD5Q&_nc_ss=7c2a8&oh=00_Af8nDhlv177uoxr2gdmhf42FOtz-D5Cb_6pya3tz210Sag&oe=6A24DA77', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.8267625969916!2d124.24308518405823!3d8.320007178341108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32557165381758ed%3A0xe7059f630daec81d!2sDalipuga%20Centennial%20Park!5e0!3m2!1sen!2sph!4v1780418501955!5m2!1sen!2sph', 
  0.00
),
(
  7, 
  'Timoga Spring Pool', 
  'National Highway, Barangay Buru-un', 
  'Iligan City', 
  'A stretch of swimming resorts widely known for icy-cold, pristine, and non-chlorinated flowing spring waters.', 
  'To experience a swimming pool unlike any other, you must submerge yourself in the famous spring waters of Timoga. This legendary cluster of roadside resorts is celebrated for its incredibly icy-cold, crystal-clear, and completely non-chlorinated waters, bubbling up naturally from underground volcanic springs deep within the earth. Unlike stagnant pools, the pristine water here is in a constant state of motion?gushing rapidly out of decorative pipes, cascading over tiled walls, and continuously draining out into nearby channels to keep the pools entirely fresh and clean every second of the day. The sheer temperature of the water delivers an intense, invigorating jolt to the system, instantly numbing the tropical heat. The resorts are perpetually alive with energy: music echoes across the pavilions, families share heavily laden picnic tables covered in lechon and local rice cakes, and swimmers dive into the glassy depths. Swimming in Timoga feels less like a commercial pool and more like bathing in a high-volume mountain spring, offering a raw, refreshing vitality that leaves your skin feeling incredibly crisp.', 
  'https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/482250283_1216714143791077_9128929783463709357_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeH1aeAFdufGcwT90mAHXLu4qf0QLQJMFpyp_RAtAkwWnMMj0yQmH1wmPgln_EEQHq6NCxqnP7jk0GXOSfABHVuH&_nc_ohc=3sfqPbagdWgQ7kNvwE3X0v4&_nc_oc=AdosQV5Dd_uSn5K5M-UXYk4jhxR1VthHC6H_vKkX-reR_iEc--n32BDZUrN7saBffJJhgzYG0YYERtwSktb44bib&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=2U1JPbJ30XINm_k4CoOnLQ&_nc_ss=7c2a8&oh=00_Af8sszM4-3eyFQ-paDD3t9G2Ga1j59HBDWBEpPBoHX6M1g&oe=6A24C020', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.1157495457664!2d124.17720472571965!3d8.191093651540323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32559fbc8d0b9b47%3A0xc8a7f6eaa45d3e6b!2sTimoga%20Spring%20Pool%2C%20Timoga%2C%20Iligan%20City%2C%209200%20Lanao%20del%20Norte!5e0!3m2!1sen!2sph!4v1780418896605!5m2!1sen!2sph', 
  100.00
),
(
  8, 
  'Mimbalot Falls', 
  'Barangay Buru-un', 
  'Iligan City', 
  'A scenic waterfall winding down a rocky, tiered slope, integrated with the Iligan Paradise Resort.', 
  'Completing the famed tourism triangle of Buru-un, Mimbalot Falls presents a highly accessible, charming encounter with nature. Unlike its sister falls that drop smoothly over vertical cliffs, Mimbalot features a rugged, wide-faced rocky cascade where water violently bounces and dances down a multi-tiered, boulder-strewn slope before collecting into a shallow, gravelly stream. The waterfall has been cleverly integrated into the Iligan Paradise Resort, making it an incredibly user-friendly destination equipped with concrete picnic tables built almost directly into the stream bed. Here, you can sit and eat lunch with your feet comfortably dangling in the cool, rushing water. For thrill-seekers, the resort offers zip-lines that fly directly across the crest of the falls, giving you a heart-pounding aerial view of the white torrent below. With its surrounding canopy of large trees, easy accessibility, and park-like amenities, Mimbalot provides a balanced, festive atmosphere where the untamed beauty of a waterfall meets the convenient comforts of a weekend family resort.', 
  'https://scontent.fcgy1-3.fna.fbcdn.net/v/t39.30808-6/474517225_1142330481229075_5441879894037363446_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEZ4pTkhr7t0CLtT582wWDLb0dFicnYUfRvR0WJydhR9POp4vnFinbQG1UCsSP3uobzXZ_tmxDLT9F3usAbyFn0&_nc_ohc=KiMecSKmrfkQ7kNvwH8KElZ&_nc_oc=AdrEwPV5fWRLmFE5Ty2_HCZIZ69JR0P6VzEjNQ8OeGaKHrUeyGpabgEhH_vFrC1xXQ7KIipoB3_Y20hXSFGr_-le&_nc_zt=23&_nc_ht=scontent.fcgy1-3.fna&_nc_gid=_AfJ39aOoA1-TpHe2KhaAg&_nc_ss=7c2a8&oh=00_Af-xUAbDV627h9o9V-83FvYrh-OISmuk7itFik--ZRT2jw&oe=6A24C5E2', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.222067175398!2d124.16781037571978!3d8.18037060169367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32559f75fb21702f%3A0xfe9abcff4a6cac1f!2sMimbalot%20Falls!5e0!3m2!1sen!2sph!4v1780419010166!5m2!1sen!2sph', 
  50.00
),
(
  9, 
  'Limunsudan Falls', 
  'Barangay Rogongon', 
  'Iligan City', 
  'A spectacular, remote two-tiered waterfall, recognized as one of the highest in the country.', 
  'Journeying to Limunsudan Falls is an arduous, multi-hour expedition reserved for the truly adventurous, requiring off-road vehicles to navigate deeply rutted mountain roads leading into the remote boundaries of Barangay Rogongon. However, the grueling journey is completely validated the moment you stand at the ridge overlook. Crashing down a mind-boggling 800 feet in two magnificent, massive tiers, Limunsudan is widely regarded as one of the highest and most powerful waterfalls in the entire country. The scale of the waterfall is gargantuan; looking at it from across the valley makes towering forest trees look like tiny blades of grass. The sheer force of the upper tier slamming into the mid-basin creates an explosion of spray that feeds the second, equally monstrous drop. Because of its deep isolation within ancestral lands, there are no commercial crowds or concrete structures here?only the ancient, untouched grandeur of Mindanao\'s deep wilderness. Standing in the presence of this roaring giant, surrounded by raw canyon walls and pristine mountain forests, leaves an indelible mark of awe on your soul.', 
  'https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/488629174_1096839072470187_530261957220294723_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEEvwILVwTqtOQtQsT66TgAL7V10n1nYeAvtXXSfWdh4GJfCZqXz6sCbCrHEQQ4dtgl21N4TLi8D5V3r_UfU3ms&_nc_ohc=TkqPj51yt04Q7kNvwH8KElZ&_nc_oc=AdoCSq29hXGsFFVtUiUezGOsfpQPfQ9pbUa9DKAsRf4SmSDb1BSFDIgpl6gGPedCLJO5OAThvs1hXi6EGRYtY3My&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=BD6udQATacXvr44mlEs-wQ&_nc_ss=7c2a8&oh=00_Af-t49m3RzReAsrM4wu7qG-3ZVDnZEB8WNdw5Z42vN9p6Q&oe=6A24DB36', 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.8925943207214!2d124.52112817571938!3d8.112417802661088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32557ddc3d73aa45%3A0xbf052970814d92aa!2sLimunsudan%20Falls!5e0!3m2!1sen!2sph!4v1780419157471!5m2!1sen!2sph', 
  0.00
);

-- ============================================================
-- ACTIVITIES
-- ============================================================
INSERT INTO Activities (DestinationID, ActivityName, ActivityDescription) VALUES
(1, 'Sightseeing', 'Observe the mighty hydroelectric twin waterfalls from the viewing deck.'),
(1, 'Photography', 'Take stunning pictures of the iconic powerhouse waterfall.'),
(2, 'Swimming', 'Plunge into the cool, deep blue-green waters of the basin.'),
(2, 'Boating', 'Ride the bamboo raft straight underneath the cascading falls.'),
(2, 'Hiking', 'Trek down the 500-step staircase down the ravine.'),
(3, 'Swimming', 'Cool down in the resort natural spring water pools.'),
(3, 'Sightseeing', 'Stroll through the garden pathways and green surroundings.'),
(4, 'Sightseeing', 'Relax by the open seaside and look at the coastline view.'),
(4, 'Photography', 'Pose with the massive ILIGAN CITY landmark signage at sunset.'),
(4, 'Cycling', 'Enjoy a leisurely evening ride along the wide park paths.'),
(5, 'Hiking', 'Climb up the forest trails to reach the cave openings.'),
(5, 'Sightseeing', 'Observe and interact responsibly with the wild monkeys.'),
(6, 'Cycling', 'Bike along the scenic seaside highway and park boundaries.'),
(6, 'Photography', 'Capture the peaceful morning horizon by the rocky breakwater.'),
(7, 'Swimming', 'Bathe in the fast-flowing, ice-cold volcanic spring pools.'),
(8, 'Sightseeing', 'Relax and have a picnic right beside the tiered cascades.'),
(8, 'Hiking', 'Explore the rocky landscape around the resort perimeter.'),
(9, 'Hiking', 'Embark on a rigorous expedition through rough terrains to the viewpoint.'),
(9, 'Photography', 'Document the breathtaking scale of the two-tiered drop.');

-- ============================================================
-- VERIFY
-- ============================================================
SELECT 'Tourist'     AS TableName, COUNT(*) AS Records FROM Tourist
UNION ALL
SELECT 'TouristSpot' AS TableName, COUNT(*) AS Records FROM TouristSpot
UNION ALL
SELECT 'Activities'  AS TableName, COUNT(*) AS Records FROM Activities
UNION ALL
SELECT 'Reviews'     AS TableName, COUNT(*) AS Records FROM Reviews;