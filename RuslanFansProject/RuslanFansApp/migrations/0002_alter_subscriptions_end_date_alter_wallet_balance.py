# Generated by Django 4.2.15 on 2024-09-21 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RuslanFansApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptions',
            name='end_date',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AlterField(
            model_name='wallet',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=33, max_digits=10),
        ),
    ]
