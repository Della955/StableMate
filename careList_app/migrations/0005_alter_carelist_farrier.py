# Generated by Django 4.2.4 on 2023-08-11 18:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('careList_app', '0004_alter_carelist_farrier_alter_carelist_feed_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carelist',
            name='farrier',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]