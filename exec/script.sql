create table facility
(
    id   varchar(255) not null
        primary key,
    addr varchar(255) null,
    lat  double       null,
    lon  double       null,
    name varchar(255) null
)
    charset = utf8mb3;

create table interest
(
    type bigint auto_increment
        primary key,
    name varchar(30) null
)
    charset = utf8mb3;

create table item
(
    id        bigint auto_increment
        primary key,
    item_type varchar(5)    null,
    price     int default 0 not null,
    type_id   bigint        null
)
    charset = utf8mb3;

create table member
(
    id            bigint auto_increment
        primary key,
    email         varchar(255)              null,
    follower_cnt  int          default 0    not null,
    following_cnt int          default 0    not null,
    gender        varchar(2)                null,
    id_tag        varchar(10)               null,
    is_admin      bit          default b'0' not null,
    is_ban        bit          default b'0' not null,
    is_out        bit          default b'0' not null,
    join_date     datetime(6)               null,
    kakao_sid     varchar(255)              null,
    name          varchar(20)               null,
    now_acc       int          default 0    not null,
    now_bg        int          default 0    not null,
    now_char      int          default 0    not null,
    password      varchar(255)              null,
    point         int          default 0    not null,
    profile       varchar(52)               null,
    provider      varchar(255) default 'HH' null,
    birth         date                      null,
    out_date      date                      null,
    authority     varchar(255)              null,
    constraint UK_keq7gq5n8omxj0taym6hwr2ty
        unique (id_tag)
)
    charset = utf8mb3;

create table ban_log
(
    id          bigint auto_increment
        primary key,
    ban_time    datetime(6)  null,
    description varchar(100) null,
    period int not null,
    member_id   bigint       null,
    constraint FK30ht7xer74l2qvnwexw7nh70u
        foreign key (member_id) references member (id)
)
    charset = utf8mb3;

create table follow
(
    id                  bigint auto_increment
        primary key,
    date_time           datetime(6) null,
    followed_member_id  bigint      null,
    following_member_id bigint      null,
    constraint follow
        unique (following_member_id, followed_member_id),
    constraint FKco2ms5c28f0n6q364fe82ewnk
        foreign key (following_member_id) references member (id),
    constraint FKsau5kh6781n8fsva45ep10yps
        foreign key (followed_member_id) references member (id)
)
    charset = utf8mb3;

create table own_item
(
    id        bigint auto_increment
        primary key,
    item_id   bigint null,
    member_id bigint null,
    constraint FK73031x7o3334s9926obmtuirx
        foreign key (item_id) references item (id),
    constraint FKppqhqgcpd215ydrf7n9jj3dug
        foreign key (member_id) references member (id)
)
    charset = utf8mb3;

create table performance
(
    id            varchar(255) not null
        primary key,
    end_date      datetime(6)  null,
    facility_name varchar(255) null,
    genre         varchar(10)  null,
    name          varchar(100) null,
    poster        varchar(255) null,
    start_date    datetime(6)  null
)
    charset = utf8mb3;

create table chatroom
(
    close_time       datetime(6)  null,
    member_name_list longtext     null,
    name             varchar(50)  null,
    open_time        datetime(6)  null,
    performance_id   varchar(255) not null
        primary key,
    constraint FK7o0othxdmuj3w4c8po88u5we
        foreign key (performance_id) references performance (id)
)
    charset = utf8mb3;

create table detail_performance
(
    actor              varchar(255) null,
    price              varchar(255) null,
    production_company varchar(255) null,
    runtime            varchar(255) null,
    performance_id     varchar(255) not null
        primary key,
    facility_id        varchar(255) null,
    constraint FK85f4f56qt1t3d3a5in2f6qhlo
        foreign key (performance_id) references performance (id),
    constraint FKp3m4nrb1wcjb598y7uygjfdr0
        foreign key (facility_id) references facility (id)
)
    charset = utf8mb3;

create table performance_image
(
    id             int auto_increment
        primary key,
    sorting_num    int unsigned null,
    url            varchar(255) null,
    performance_id varchar(255) null,
    constraint FK7yb0sxb8rv8e7jxlcis7kn8sw
        foreign key (performance_id) references performance (id)
)
    charset = utf8mb3;

create table performance_like
(
    id             bigint auto_increment
        primary key,
    member_id      bigint       null,
    performance_id varchar(255) null,
    constraint FKff23l2wjr6vo351ckpov24ofc
        foreign key (performance_id) references performance (id),
    constraint FKg5qawtl5k1qrq7i6spd11jwd7
        foreign key (member_id) references member (id)
)
    charset = utf8mb3;

create table point_log
(
    id        bigint auto_increment
        primary key,
    point     int         not null,
    timestamp datetime(6) null,
    type      varchar(10) null,
    member_id bigint      null,
    constraint FKpc5s54gy4e1gcvel1ymljexv
        foreign key (member_id) references member (id)
)
    charset = utf8mb3;

create table reaction_type
(
    id   int auto_increment
        primary key,
    name varchar(20) null
)
    charset = utf8mb3;

create table reports
(
    id                   bigint auto_increment
        primary key,
    contents             varchar(255) null,
    date_time            datetime(6)  null,
    status               varchar(20)  null,
    type                 varchar(255) null,
    member_id            bigint       null,
    respondent_member_id bigint       null,
    constraint FKnwary99dj64j1dnb7y6t4dokl
        foreign key (respondent_member_id) references member (id),
    constraint FKo5p2n0a83sy6bxdiucjt3oua3
        foreign key (member_id) references member (id)
)
    charset = utf8mb3;

create table review
(
    id                   bigint auto_increment
        primary key,
    contents             varchar(255)     null,
    is_delete            bit default b'0' not null,
    performance_datetime datetime(6)      null,
    star_eval            double           not null,
    title                varchar(65)      null,
    update_time          datetime(6)      null,
    writing_time         datetime(6)      null,
    member_id            bigint           null,
    performance_id       varchar(255)     null,
    constraint FK5078kpjm6f1dv4rachnpwrlak
        foreign key (performance_id) references performance (id),
    constraint FKk0ccx5i4ci2wd70vegug074w1
        foreign key (member_id) references member (id)
)
    charset = utf8mb3;

create table comment
(
    id           bigint auto_increment
        primary key,
    contents     mediumtext       null,
    is_delete    bit default b'0' not null,
    update_time  datetime(6)      null,
    writing_time datetime(6)      null,
    member_id    bigint           null,
    review_id    bigint           null,
    constraint FKmrrrpi513ssu63i2783jyiv9m
        foreign key (member_id) references member (id),
    constraint FKnf4ni761w29tmtgdxymmgvg8r
        foreign key (review_id) references review (id)
)
    charset = utf8mb3;

create table reaction_cnt
(
    id               bigint auto_increment
        primary key,
    reaction_cnt     int default 1 not null,
    reaction_type_id int           null,
    review_id        bigint        null,
    constraint FK2cywqdajg4u1e0x35xeic5smu
        foreign key (reaction_type_id) references reaction_type (id),
    constraint FKsbgdct7k2tgfuhy8j0bc90kx7
        foreign key (review_id) references review (id)
)
    charset = utf8mb3;

create table review_reaction
(
    id               bigint auto_increment
        primary key,
    member_id        bigint null,
    reaction_type_id int    null,
    review_id        bigint null,
    constraint reaction
        unique (review_id, member_id),
    constraint FKcj6w193lagh5wq2ss20k2tka5
        foreign key (review_id) references review (id),
    constraint FKdax2g3a878fn841xhtg9gyiw2
        foreign key (reaction_type_id) references reaction_type (id),
    constraint FKfoo39t911ytqs7lq7tse8s5y8
        foreign key (member_id) references member (id)
)
    charset = utf8mb3;

create table twitter
(
    id       varchar(25)  not null
        primary key,
    contents varchar(255) null,
    time     datetime(6)  null,
    url      varchar(255) null
);

create table user_interest
(
    id          bigint auto_increment
        primary key,
    date_time   datetime(6) null,
    member_id   bigint      null,
    interest_id bigint      null,
    constraint FKb2c20k2dqknrm5t337typ3s1b
        foreign key (interest_id) references interest (type),
    constraint FKec6ax8l2jw5brf6ba9telkxh0
        foreign key (member_id) references member (id)
)
    charset = utf8mb3;


