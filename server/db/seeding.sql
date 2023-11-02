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
        'mscot',
        123,
        'Michael Scott',
        'https://img.buzzfeed.com/buzzfeed-static/static/2023-07/25/19/campaign_images/5671a25e79b2/83-times-michael-scott-from-the-office-made-us-bu-2-829-1690312059-0_dblbig.jpg',
        'Male',
        2,
        2, 
        1,
        TRUE
    ),
    (
        'dshrute',
        123,
        'Dwight Shrute',
        'https://www.sportsintegrity.com/cdn/shop/files/rainn-wilson-signed-the-office-dwight-schrute-interim-manager-11x14-photo-psa-00_1024x1024.jpg?v=1692148634',
        'Male',
        1,
        2, 
        2,
        TRUE
    ),
    (
        'narddog',
        123413535,
        'Andy Bernard The NardDog',
        'https://litwithsharon.files.wordpress.com/2020/10/b7f3890a1fc9bfd012720808603b0d00.jpg',
        'Male',
        3,
        3,
        3,
        FALSE
    ),
    (
        'pbeesle',
        123413535,
        'Pam Haplert',
        'https://helios-i.mashable.com/imagery/articles/03gdvoXyxNZOb3BhLSIqM0W/hero-image.fill.size_1200x900.v1623370474.jpg',
        'Female',
        2,
        2,
        1,
        FALSE
    ),
    (
        'wwhite',
        123413535,
        'Walter White',
        'https://imgix.bustle.com/uploads/image/2019/1/23/cfc79329-9a8e-4595-b1f9-b31f725fbc28-kelly-kapoor-office.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg',
        'Female',
        2,
        2,
        3,
        FALSE
    ),
    (
        'sgoodman',
        123,
        'Saul Goodman',
        'https://www.shareicon.net/data/256x256/2015/08/17/86684_cat_256x256.png',
        'Male',
        3,
        2, 
        1,
        TRUE
    );

\echo 'Finished seeding database'