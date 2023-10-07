\echo 'Seeding database...'

INSERT INTO
    users (
        username,
        passhash,
        display_name,
        profile_pic,
        gender,
        budget_tier,
        clean_tier,
        loud_tier,
        coed
    )
VALUES
    (
        'janedoe321',
        123,
        'Jane Doe',
        'https://files.softicons.com/download/animal-icons/cute-animals-icons-by-archigraphs/png/512x512/Kitty_Archigraphs.png',
        'female',
        1,
        2,
        3,
        TRUE
    ),
    (
        'johndoe123',
        123,
        'john doe',
        'https://files.softicons.com/download/animal-icons/cat-force-icons-by-iconka/ico/cat_hungry.ico',
        'male',
        3,
        3,
        3,
        FALSE
    ),
    (
        'foobar123',
        432245,
        'foo bar',
        'https://files.softicons.com/download/animal-icons/cute-animals-icons-by-archigraphs/png/512x512/Kitty_Archigraphs.png',
        'other',
        1,
        3,
        2,
        TRUE
    ),
    (
        'wwhite',
        123413535,
        'Walter White',
        'https://play-lh.googleusercontent.com/zugjBkjgC6esKpvO4ZzJMluV468N5SJZi2Z3LOp_m6PySL0uMWQCzku4hsC49PTEJHg',
        'prefer not to say',
        2,
        2,
        1,
        FALSE
    ),
    (
        'sgoodman',
        123,
        'Saul Goodman',
        'https://www.shareicon.net/data/256x256/2015/08/17/86684_cat_256x256.png',
        'male',
        3,
        2, 
        1,
        TRUE
    );

\echo 'Finished seeding database'